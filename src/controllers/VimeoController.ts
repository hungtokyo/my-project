import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import client from "../config/config.vimeo";
var fs = require('fs')
var path = require('path')
var tus = require('tus-js-client')

import { User } from "../entity/User";
import { ReplOptions } from "repl";

class VimeoController {
    // get list danh sach cac video tren my vimeo
    static getListVideos = async (req: Request, rep: Response) => {
        client.request({
            method: 'GET',
            path: '/users/112454108/videos'// path theo api cua vimeo
        }, function (error, body, status_code, headers) {
            if (error) {
                console.log(error);
            }
            rep.send({ 'status': status_code });
            console.log('body: ', body, status_code, headers);
        });
    }
    // xoa 1 video
    static deleteVideos = async (req: Request, rep: Response) => {
        client.request({
            method: 'delete',
            path: '/videos/407644427'// path theo api cua vimeo
        }, function (error, body, status_code, headers) {
            if (error) {
                console.log(error);
            }
            rep.send({ 'data': body, 'status': status_code });
            console.log('body: ', body, status_code);
        });

    }
    // sửa vimeo đã update
    static editVideos = async (req: Request, rep: Response) => {
        const uri = '/videos/407644427';
        client.request({
            method: 'PATCH',
            path: uri,
            params: {
                'name': 'english rab test edit',
                'description': "This video was edited through the Vimeo API's NodeJS SDK."
            }
        }, function (error, body, statusCode, headers) {
            if (error) {
                console.log('There was an error making the request.')
                console.log('Server reported: ' + error)
                return
            }

            console.log('The title and description for ' + uri + ' has been edited.')
            rep.send({ 'message': 'editting succes!', 'uri': uri });
        })
    }
    // upload lên 1 vidao  mới
    static uploadVideos = async (req: Request, rep: Response) => {
        // url thư mục chứa video muốn upload
        let file_name = "F:/download/Video/Irregularverbs.MP4";
        const FILE_SIZE = 24601;
        console.log('Uploading: ' + file_name)

        let params = {
            'name': 'Vimeo API SDK test upload', // tên video muốn hiển thị trên vimeo
            'description': "This video was uploaded through the Vimeo API's NodeJS SDK."
        }
        client.upload(
            file_name,
            params,
            // mockCompleteCallback, mockProgressCallback, mockErrorCallback,
            function (uri) {
                console.log('Your video URI is: ' + uri);
                // check trang thái updload
                client.request(uri + '?fields=transcode.status', function (error, body, status_code, headers) {
                    if (body.transcode.status === 'complete') {
                        console.log('Your video finished transcoding.')
                    } else if (body.transcode.status === 'in_progress') {
                        console.log('Your video is still transcoding.')
                    } else {
                        console.log('Your video encountered an error during transcoding.')
                    }
                })
                // nhận liên kết đến video đã tải lên
                client.request(uri + '?fields=link', function (error, body, statusCode, headers) {
                    if (error) {
                        console.log('There was an error making the request.')
                        console.log('Server reported: ' + error)
                        return
                    }

                    console.log('"' + file_name + '" has been uploaded to ' + body.link);
                    rep.send({ 'uri': uri, 'link': body.link })
                })
                //Your video URI is: /videos/407644427
                // Your video is still transcoding.
                // Your video link is: https://vimeo.com/407644427
            },
            function (bytes_uploaded, bytes_total) {
                var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2)
                console.log(bytes_uploaded, bytes_total, percentage + '%')
            },
            function (error) {
                console.log('Failed because: ' + error)
            }
        )
    }
    static checkLiveStream = async (req: Request, rep: Response) => {
        
        client.request({
            method: 'GET',
            path: '/live_events'
        }, function (error, body, status_code, headers) {
            if (error) {
                console.log(error);

            }
            rep.send({ 'body': body, 'status': status_code });
            // console.log('check live stream: ', body.live_quota, status_code);

        })
    }
    static liveStream = async (req: Request, rep: Response) => {

    }
}
export default VimeoController;