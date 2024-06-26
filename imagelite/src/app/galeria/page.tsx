'use client'

import { ImageCard, Template, Button, InputText, useNotification, AuthenticatedPage } from '@/components'
import { Image } from '@/resources/image/image.resources'
import { useImageService } from '@/resources'
import { useState } from 'react'
import Link from 'next/link'


export default function GaleriaPage() {

    const useService = useImageService();
    const notification = useNotification();
    const [images, setImages] = useState<Image[]>([]);
    const [query, setQuery] = useState<string>('');
    const [extension, setExtension] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [lastSearch, setLastSearch] = useState<string>('');

    async function searchImagem() {
        setLoading(true)
        const result = await useService.buscar(query, extension);
        setImages(result);
        setLoading(false);
        setLastSearch(query);

        if(result.length === 0) {
            notification.notify('Nenhuma imagem encontrada', 'warning');
        } 
    }

    function renderImagesCard(image: Image) {
        return (
            <ImageCard
                key={image.url}
                nome={image.name}
                tamanho={image.size}
                dataUpload={image.uploadDate}
                extension={image.extension}
                src={image.url}
            />
        )
    }

    function renderImagesCards() {
        return images.map((image: Image) => renderImagesCard(image));
    }

    return (
        <AuthenticatedPage>
            <Template loading={loading} >
                <section className='flex flex-col items-center justify-center my-5'>
                    <div className='flex space-x-4'>
                        <InputText onChange={event => setQuery(event.target.value)}
                                placeholder='Nome da Imagem'/>
                        <select onChange={e => setExtension(e.target.value)} 
                                name="" id="" 
                                className='border px-4 py-2 rounded-lg text-gray-900'>
                            <option value="">Todos os formatos</option>
                            <option value='PNG'>PNG</option>
                            <option value='JPEG'>JPEG</option>
                            <option value='GIF'>GIF</option>
                        </select>
                        <Button style='bg-blue-500 hover:bg-blue-600' label='Buscar' onClick={searchImagem} />
                        <Link href="/formulario">
                            <Button style='bg-green-500 hover:bg-green-600' label='Adicionar' />
                        </Link>
                    </div>
                </section>

                <section className='grid grid-cols-4 gap-8'>
                    { renderImagesCards() }
                </section>
            </Template>
        </AuthenticatedPage>
    )
}