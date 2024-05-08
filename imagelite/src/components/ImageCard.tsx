'use client'

interface ImageCardProps {
    nome?: string;
    tamanho?: number;
    dataUpload?: string;
    src?: string;
    extension?: string;
}

export const ImageCard: React.FC<ImageCardProps> = (props: ImageCardProps) => {

    function download() {
        window.open(props.src, '_blank')
    }

    return (
        <div className="card relative bg-white-0 rounded-md shadow-md transition-transform ease-in duration-300 transform hover:shadow-lg hover:-translate-y-2">
            <img onClick={download} src={props.src} className="h-56 w-full object-cover rounded-t-md" alt=""/>
            <div className="card-body p-4">
                <h5 className="text-xl font-semibold mb-2 text-gray-600">{ props.nome }</h5>
                <p className="text-grey-500">{ props.extension }</p>
                <p className="text-grey-500">{ formatBytes(props.tamanho, 2) }</p>
                <p className="text-grey-500">{ props.dataUpload }</p>
            </div>
        </div>
    )
}

function formatBytes(bytes: number = 0, decimals = 2) {
    if(!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}