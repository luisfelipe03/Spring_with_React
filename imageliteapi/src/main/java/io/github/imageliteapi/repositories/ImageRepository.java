package io.github.imageliteapi.repositories;

import io.github.imageliteapi.enums.ImageExtensions;
import io.github.imageliteapi.models.Image;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.util.StringUtils;

import java.util.List;
import static org.springframework.data.jpa.domain.Specification.anyOf;

public interface ImageRepository extends JpaRepository<Image, String>, JpaSpecificationExecutor<Image> {


    /**
     * Find all images by extension and name or tags like.
     *
     * @param extensions the extensions
     * @param query      the query
     * @return the list
     *
     * SELECT * FROM image WHERE 1 = 1 AND extension = ? AND (name = ? OR tags LIKE ?)
     *
     */
    default List<Image> findByExtensionAndNameOrTagsLike(ImageExtensions extensions, String query) {
        // SELECT * FROM image WHERE 1 = 1
        Specification<Image> conjunction = (root, query1, criteriaBuilder) -> criteriaBuilder.conjunction();
        Specification<Image> spec = Specification.where( conjunction );

        if(extensions != null) {
            // AND extension = ?
            Specification<Image> extensionEqual = (root, query1, criteriaBuilder) -> criteriaBuilder.equal(root.get("extension"), extensions);
            spec = spec.and(extensionEqual);
        }

        if(StringUtils.hasText(query)) {
            // AND (name = ? OR tags LIKE ?)
            Specification<Image> nameLike = (root, query1, criteriaBuilder) -> criteriaBuilder.like(root.get("name"), "%" + query + "%");
            Specification<Image> tagsLike = (root, query1, criteriaBuilder) -> criteriaBuilder.like(root.get("tags"), "%" + query + "%");
            spec = spec.and(anyOf(nameLike, tagsLike));
        }

        return findAll(spec);
    }
}
