import React, { Component } from 'react'

class ImageUpload extends Component {

    constructor(props) {
        super(props);
        this.state = { picture: null };
    }

    imageChosen = event => {
        this.setState({
            picture: event.target.files[0],
        });
    }

    uploadImage = () => {
        let data = new FormData()
        data.append('file', this.state.picture)
        fetch('/uploadImage', {
            method: 'POST',
            body: data
        }).then((response) => {
            if(!response.ok)
                return response.json();
            else
                return response;
        }).then((response) => {
            if(!response.ok) throw new Error(response.message);
            else return response;
        }).then((data) => {
                alert("Image uploaded");
        }).catch((error) => {
                alert(error);
            });
    }

    render() {
        return (
            <div>
            <input type="file" accept=".gif,.jpg,.jpeg,.png" onChange={this.imageChosen}/>
                <button onClick={this.uploadImage}>upload</button>
            </div>

        );
    }
}

export default ImageUpload