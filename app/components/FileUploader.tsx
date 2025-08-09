import React, {useCallback} from 'react'
import {useDropzone} from "react-dropzone";
import {ICONCROSS, ICONUPLOAD, MAXFILESIZE, PDF} from "../../constants";
import {formatSize} from "~/lib/utils";

const FileUploader = ({onFileSelect}: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;

        onFileSelect?.(file);
    }, [onFileSelect])

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf']},
        maxSize: MAXFILESIZE,
    })

    const file = acceptedFiles[0] || null;

    return (
        <div className={"w-full p-4 rounded-2xl bg-white"}>
            <div {...getRootProps()}>
                <input {...getInputProps()}/>

                <div className={"space-y-4 cursor-pointer"}>
                    {file ? (
                        <div className={"uploader-selected-file"}
                        onClick={(e) => e.stopPropagation()}>
                            <img src={PDF} className={"size-10"} alt={"pdf"}/>
                            <div className={"flex items-center space-x-3"}>
                                <div>
                                    <p className={"text-sm font-medium text-gray-700 truncate max-w-xs"}>{file.name}</p>
                                    <p className={"text-sm text-gray-500"}>{formatSize(file.size)}</p>
                                </div>
                            </div>
                            <button className={"p-2 cursor-pointer"} onClick={(e) => {onFileSelect?.(null)}}/>
                            <img src={ICONCROSS} className={"w-4 h-4"} alt={"delete"}/>
                        </div>
                    ): (
                        <div>
                            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                                <img src={ICONUPLOAD} className={"size-10"} alt={"upload"}/>
                            </div>
                            <p className="text-md text-gray-500">
                                <span className="font-semibold">
                                    Click to upload
                                </span> or drag and drop
                            </p>
                            <p className="text-md text-gray-500">PDF upto {formatSize(MAXFILESIZE)}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default FileUploader
