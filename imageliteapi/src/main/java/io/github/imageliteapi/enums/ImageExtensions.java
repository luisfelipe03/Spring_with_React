package io.github.imageliteapi.enums;

import ch.qos.logback.classic.spi.LoggingEventVO;
import lombok.Getter;
import org.springframework.http.MediaType;

import java.util.Arrays;

@Getter
public enum ImageExtensions {
    PNG(MediaType.IMAGE_PNG),
    JPEG(MediaType.IMAGE_JPEG),
    GIF(MediaType.IMAGE_GIF);

    private final MediaType mediaType;

    ImageExtensions(MediaType mediaType) {
        this.mediaType = mediaType;
    }

    public static ImageExtensions valueOf(MediaType mediaType){
        return Arrays.stream(values())
                .filter(ie -> ie.mediaType.equals(mediaType))
                .findFirst()
                .orElse(null);
    }

    public static ImageExtensions ofName(String name){
        return Arrays.stream(values())
                .filter(ie -> ie.name().equalsIgnoreCase(name))
                .findFirst()
                .orElse(null);
    }

}
