import React, { Component } from 'react'
import { Input, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

export default class InstagramComponents extends Component {

    render() {
        console.log("Tprops Image", this.props.images)
        return (
            <div className="container m-4">
                <div className="row">
                    <div className="col-md-8">
                        {/* {
                            (this.props.currentHash === '' && this.props.currentTitle === '') ?
                                <h1>No data</h1> :
                                <> */}
                        2e575e5b20bc615fc1a7281b6363511ae837db241cedf64d5cfd5e326a025861
                        <div className="w-100">

                            {/* <video
                                            src={`https://ipfs.infura.io/ipfs/${this.props.currentHash}`}
                                            controls

                                        >
                                        </video> */}
                            {/* <iframe src={`https://ipfs.infura.io/ipfs/${this.props.currentHash}`}
                                            frameBorder="0" allowFullScreen className="video"></iframe> */}
                        </div>
                        {/* <h3><b><i>{this.props.currentTitle}</i></b></h3> */}
                        {/* </>

                        } */}
                    </div>

                    <div className="col-md-4">
                        <Typography variant="subtitle1" color="initial">
                            File Upload
                        </Typography>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault()
                                const description = this.imageDescription.value
                                this.props.uploadImage(description)
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <label htmlFor="contained-button-file">
                                    <Input
                                        className="mt-3"
                                        accept=".jpg,.jpeg,.png,.bmp,.gif"
                                        id="contained-button-file"
                                        type="file"
                                        onChange={this.props.captureFile}
                                    />
                                </label>
                            </Stack>
                            <input
                                type="text"
                                className="mt-3"
                                id="imageDescription"
                                label="Video Tile"
                                ref={(input) => {
                                    this.imageDescription = input
                                }}
                            />
                            <button type="submit" className="btn btn-primary mt-3">
                                Upload
                            </button>
                        </form>


                        {(this.props.images.length < 1) ? <h1>No Uploaded Image</h1> : this.props.images.map((video, key) => {
                            return (
                                <Card sx={{ maxWidth: 345 }} key={video.id}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={`https://ipfs.infura.io/ipfs/${video.hash}`}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {video.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )
                        })}


                    </div>
                </div>
            </div>
        )
    }
}