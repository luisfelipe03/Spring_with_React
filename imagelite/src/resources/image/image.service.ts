import { Image } from './image.resources'

class ImageService {
    baseUrl: string = 'http://localhost:8080/api/v1/images';

    async buscar() : Promise<Image[]> {
        const response = await fetch(this.baseUrl);
        return await response.json();
    }
}

export const useImageService = () => new ImageService();