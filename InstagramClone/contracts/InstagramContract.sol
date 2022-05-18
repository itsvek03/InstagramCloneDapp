// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Instagram {
     string public appName ="Decentgram";

     struct Image{
          uint id;
          string hash;
          string description;
          uint tipAmount;
          address payable author;
     }


     event ImageCreated(
          uint id,
          string hash,
          string description,
          uint tipAmount,
          address payable author
     );

     event ImageTipped(uint id,string hash,string description,uint tipAmount,address payable author);

     mapping(uint => Image) public images;
     uint public imageCount=0;

     function uploadImage(string memory _imgHash,string memory _description) public{
          require(bytes(_imgHash).length >0,"Image Hash lenght is less than 1");
          require(bytes(_description).length >0,"Description lenght is less than 1");
address payable masg= payable(msg.sender);
          require(masg !=address(0x0));

          imageCount =imageCount+1;

          images[imageCount] =Image(imageCount,_imgHash,_description,0,masg);

          emit ImageCreated(imageCount,_imgHash,_description,0,masg);
     }

     function  tipImageUpload(uint _id) public payable{
          require(_id > 0 && _id <= imageCount,"Id is invalid");

          Image memory _image = images[_id];

          address payable _author = _image.author;

          _author.transfer(msg.value);

          _image.tipAmount += msg.value;

          // Update the image
          images[_id] =_image;

           emit ImageTipped(_id,_image.hash,_image.description,_image.tipAmount,_author);
     }




}