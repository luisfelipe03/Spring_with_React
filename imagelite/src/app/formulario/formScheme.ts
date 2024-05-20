import * as Yup from 'yup';

export interface FormProps {
    name: string;
    tags: string;
    file: string | Blob;
}

export const formScheme: FormProps = { name: '', tags: '', file: '' }

export const formValidationScheme = Yup.object().shape({
    name: Yup.string().trim().required('Nome é obrigatório').max(50, 'Nome deve ter no máximo 50 caracteres'),
    tags: Yup.string().trim().required('Tags são obrigatórias').max(50, 'Tags devem ter no máximo 50 caracteres'),
    file: Yup.mixed<Blob>().required('Imagem é obrigatória').test('size', 'Tamanho maximo 4MB', (file) => {
        return file.size < 4000000;
    })
    .test('type', 'Formatos aceitos: jpeg, png, gif', (file) => {
        return file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif';
    })
})