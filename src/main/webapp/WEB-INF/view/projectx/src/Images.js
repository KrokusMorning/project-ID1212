import React, { Component } from 'react'


class Images extends Component {


    constructor(props) {
        super(props);
        this.state = { images: [] };
    }
    componentDidMount() {
        fetch('getAllImages', {
            method: 'get',
        })
            .then((response) => {
            if (response.status == 200) {
                return response.json()
            }
        })
            .then((responseData) => {
                this.setState({images: responseData});
            })

    }

    deleteImage = (imageName) => {
        fetch('/deleteImage/' + imageName, {
            method: 'DELETE',
        }).then((response) => {
            if(!response.ok) throw new Error(response.status);
            else return response;
        }).then((data) => {
            this.componentDidMount();
        }).catch((error) => {
            console.log('error: ' + error);
        });

    }

     Item = (props) => {
        return <li>{props.value}</li>;
    }

    MyList = (items) => {
        return (
            <div>
                {items.map((item) =>
                    <div>
                        <img src={"data:image/jpeg;base64," + item.base64} height={500}/><br/>
                        {this.props.auth ? <div><text>Uploader: {item.uploader}</text><br/>
                            <text>Filename: {item.name.split('.').slice(0, -1).join('.')}</text>
                        <button onClick={()=>this.deleteImage(item.name)}>Delete</button></div> : <br/>}
                    </div>)}
            </div>
        );
    }

    render() {
        if (!this.state.images || !this.state.images.length)
            return null;
        return (
            <div>
                {this.MyList(this.state.images)}
            </div>

        );
    }
}

export default Images