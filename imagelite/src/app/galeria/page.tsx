'use client'

import { ImageCard, Template } from '@/components'
import { Image } from '@/resources/image/image.resources'
import { useImageService } from '@/resources/image/image.service'
import { useState } from 'react'

export default function GaleriaPage() {

    const useService = useImageService();
    const [images, setImages] = useState<Image[]>([]);
    const [query, setQuery] = useState<string>('');
    const [extension, setExtension] = useState<string>('');

    async function searchImagem() {
        const result = await useService.buscar();
        setImages(result);
        console.table(result);
    }

    function renderImagesCard(image: Image) {
        return (
            <ImageCard
                nome={image.name}
                tamanho={image.size}
                dataUpload={image.uploadDate}
                src={image.url}
            />
        )
    }

    function renderImagesCards() {
        return images.map((image: Image) => renderImagesCard(image));
    }

    return (
        <Template>
            
            <section className='flex flex-col items-center justify-center my-5'>
                <div className='flex space-x-4'>
                    <input type="text" className='border px-5 py-2 rounded-lg text-gray-900' />
                    <select name="" id="" className='border px-4 py-2 rounded-lg text-gray-900'>
                        <option value="jpg">Todos os formatos</option>
                    </select>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-lg' onClick={searchImagem}>Buscar</button>
                    <button className='bg-green-500 text-white px-4 py-2 rounded-lg'>Adicionar</button>
                </div>
            </section>

            <section className='grid grid-cols-4 gap-8'>
                { renderImagesCards() }
            </section>
        </Template>
    )
}