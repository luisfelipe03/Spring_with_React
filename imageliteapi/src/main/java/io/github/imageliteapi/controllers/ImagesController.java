package io.github.imageliteapi.controllers;

import io.github.imageliteapi.dto.ImageDTO;
import io.github.imageliteapi.enums.ImageExtensions;
import io.github.imageliteapi.mapper.ImageMapper;
import io.github.imageliteapi.models.Image;
import io.github.imageliteapi.services.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/images")
@Slf4j
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ImagesController {

    @Autowired
    ImageService service;
    @Autowired
    ImageMapper mapper;

    @PostMapping
    public ResponseEntity save(
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name,
            @RequestParam("tags") List<String> tags
            ) throws IOException {
    log.info("Imagem recebida: nome = {}, size = {}", file.getOriginalFilename(), file.getSize());

    Image image = mapper.mapToImage(file, name, tags);
    Image imageSaved = service.save(image);
    URI imageUri = buildImageURL(imageSaved);

    return ResponseEntity.created(imageUri).build();
    }
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable(value = "id") String id) {
        var optionalImageimage = service.getById(id);
        if (optionalImageimage.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        var image = optionalImageimage.get();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(image.getExtension().getMediaType());
        headers.setContentLength(image.getSize());
        headers.setContentDispositionFormData("inline; filename=\"" + image.getFileName() + "\"" , image.getFileName());

        return new ResponseEntity<>(image.getFile(), headers, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ImageDTO>> search(
            @RequestParam(value = "extension", required = false, defaultValue = "") String extension,
            @RequestParam(value = "query", required = false) String query) {
        var result = service.search(ImageExtensions.ofName(extension), query);
        var images = result.stream().map(image -> {
                var url = buildImageURL(image);
                return mapper.mapToImageDTO(image, buildImageURL(image).toString());
        }).collect(Collectors.toList());

        return ResponseEntity.ok(images);
    }

    private URI buildImageURL(Image image) {
        String imagePath = "/" + image.getId();
        return ServletUriComponentsBuilder
                .fromCurrentRequestUri()
                .path(imagePath)
                .buildAndExpand(image.getId())
                .toUri();
    }
}
