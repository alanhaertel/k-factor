export function ErrorParagraphs ({ errors }: { errors: string[] }) {
    return (
        <div>
            {errors.map(error => (
                <p key={error}>{`● ${error}`}</p>
            ))}
        </div>
    )
}
