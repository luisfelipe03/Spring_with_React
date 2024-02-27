package io.github.imageliteapi.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/images")
@Slf4j
public class ImagesController {

    @PostMapping
    public ResponseEntity save(
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name,
            @RequestParam("tags") List<String> tags
            ) {
    log.info("Imagem recebida: nome = {}, size = {}", file.getOriginalFilename(), file.getSize());
    log.info("Nome definido para a imagem:  {}", name);
    log.info("Tags: {}", tags);
    return ResponseEntity.ok().build();
    }
}
