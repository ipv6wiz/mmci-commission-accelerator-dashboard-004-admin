export interface DocUploadFormDto {
    title: string;
    text: string;
    folder: string;
    newFileName: string;
    uploadUrl: string;
    accept: string;
    allowedExts: string[];
    uploaded: boolean;
    ctrlName: string;
    status: number;
}
