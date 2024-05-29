import { Image } from './image.resources'
import { useAuth } from '@/resources'

class ImageService {
    baseUrl: string = 'http://localhost:8080/api/v1/images';
    auth = useAuth();

    async buscar(query: string = "", extension: string = "") : Promise<Image[]> {
        const useSession = this.auth.getUserSession();
        const url = `${this.baseUrl}?query=${query}&extension=${extension}`;
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${useSession?.accessToken}`
            }
        });
        return await response.json();
    }

    async salvar(dados: FormData) : Promise<string> {
        const useSession = this.auth.getUserSession();
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            body: dados,
            headers: {
                "Authorization": `Bearer ${useSession?.accessToken}`
            }
        });
        return response.headers.get('location') ?? '';
    }
}

export const useImageService = () => new ImageService();