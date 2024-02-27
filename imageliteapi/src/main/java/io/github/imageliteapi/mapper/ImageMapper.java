package io.github.imageliteapi.mapper;

import io.github.imageliteapi.dto.ImageDTO;
import io.github.imageliteapi.enums.ImageExtensions;
import io.github.imageliteapi.models.Image;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@Component
public class ImageMapper {

    public Image mapToImage(MultipartFile file, String name, List<String> tags) throws IOException {
        return Image.builder()
                .name(name)
                .tags(String.join(",", tags))
                .size(file.getSize())
                .extension(ImageExtensions.valueOf(MediaType.valueOf(Objects.requireNonNull(file.getContentType()))))
                .file(file.getBytes())
                .build();
    }

    public ImageDTO mapToImageDTO(Image image, String url) {
        return ImageDTO.builder()
                .name(image.getName())
                .url(url)
                .size(image.getSize())
                .extension(image.getExtension().name())
                .uploadDate(image.getUploadDate().toLocalDate())
                .build();
    }
}
