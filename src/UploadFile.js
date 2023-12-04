import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';


const fileTypes = ['JPEG', 'PNG', 'GIF', 'JPG'];

export function FileUpload() {
    const [file, setFile] = useState(null);
    const handleChange = async (newFile) => {
        setFile(newFile);

        try{
            const formData = formData.append('file', file)
        }catch(error){
            alert(error)
        }


        var request = require('request');
        var options = {
            'method': 'POST',
            'url': 'https://api.virusscannerapi.com/virusscan',
            'headers': {
                'X-ApplicationID': 'd0340adf-d2c2-4f92-8d9d-718df75ba17b',
                'X-SecretKey': 'b18ce6eb-b3b7-4a35-b321-b2e903add179'
            },
            formData
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
        });



    };

const h4_style = {
    fontWeight: 'bold',

}

    const uploader_style = {
        maxWidth: '400px',

    }

    const mainDiv = {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginTop: '50px'

    }

    return (
        <div style={mainDiv}>
            <h5 style={h4_style}>Hello To Drag & Drop Files</h5>
            <div style={uploader_style}>
                <FileUploader
                    multiple={true}
                    handleChange={handleChange}
                    name="newFile"
                    types={fileTypes}
                />

            </div>

            <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>
        </div>
    );
}

