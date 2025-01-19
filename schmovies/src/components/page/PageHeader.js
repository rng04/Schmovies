export default function PageHeader({content}) {
    return (
        <h1 className="mb-2 font-sans text-center text-4xl">
            <strong>{content}</strong>
        </h1>
    )
}