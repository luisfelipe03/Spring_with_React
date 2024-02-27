package io.github.imageliteapi.services;

import io.github.imageliteapi.enums.ImageExtensions;
import io.github.imageliteapi.models.Image;
import io.github.imageliteapi.repositories.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    @Autowired
    private final ImageRepository repository;

    @Override
    @Transactional
    public Image save(Image image) {
        return repository.save(image);
    }

    @Override
    @Transactional
    public Optional<Image> getById(String id) {
        return repository.findById(id);
    }

    @Override
    public List<Image> search(ImageExtensions extension, String query) {
        return repository.findByExtensionAndNameOrTagsLike(extension, query);
    }
}
