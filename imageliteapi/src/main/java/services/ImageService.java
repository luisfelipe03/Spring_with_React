package services;

import io.github.imageliteapi.models.Image;
import io.github.imageliteapi.repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImageService {

    @Autowired
    ImageRepository repository;

    public List<Image> getAllImages() {
        return repository.findAll();
    }

    

}
