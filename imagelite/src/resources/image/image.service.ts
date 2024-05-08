import { Image } from './image.resources'

class ImageService {
    baseUrl: string = 'http://localhost:8080/api/v1/images';

    async buscar(query: string = "", extension: string = "") : Promise<Image[]> {
        const url = `${this.baseUrl}?query=${query}&extension=${extension}`;
        const response = await fetch(url);
        return await response.json();
    }
}

export const useImageService = () => new ImageService();