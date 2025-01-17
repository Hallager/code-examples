export function cleanBucketName(bucketName:string|null|undefined) {
    if (!bucketName || bucketName.length == 0 || bucketName == null || bucketName == undefined) {
        return bucketName;
    }
    // Erstat æøåÆØÅ med eoeoaoa
    let cleanedBucketName = bucketName.replace(/[æøåÆØÅ]/g, (match) => {
        switch (match) {
            case 'æ': return 'e';
            case 'ø': return 'o';
            case 'å': return 'a';
            case 'Æ': return 'e';
            case 'Ø': return 'o';
            case 'Å': return 'a';
            default: return match;
        }
    });

    // Fjern alle ikke-alfanumeriske tegn bortset fra mellemrum
    cleanedBucketName = cleanedBucketName.replace(/[^a-zA-Z0-9\s]/g, '');

    // Erstat mellemrum med _
    cleanedBucketName = cleanedBucketName.replace(/\s+/g, '_');

    return cleanedBucketName.toLowerCase();
}