package io.github.imageliteapi.services;

import io.github.imageliteapi.enums.ImageExtensions;
import io.github.imageliteapi.models.Image;

import java.util.List;
import java.util.Optional;

public interface ImageService {
    Image save(Image image);
    Optional<Image> getById(String id);

    List<Image> search(ImageExtensions extension, String query);
}
