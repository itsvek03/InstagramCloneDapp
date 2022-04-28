// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16 <8.13.0;

contract Instagram {
     string public appName ="Decentgram";

     struct Image{
          uint id;
          string hash;
          string description;
          uint tipAmount;
          address payable author;
     }


     event ImageCreated{
          uint id;
          string hash;
          string description;
          uint tipAmount;
          address payable author;
     }

     event ImageTipped{
           uint id;
          string hash;
          string description;
          uint tipAmount;
          address payable author;
     }

     mapping(uint => Image) public images;
     public uint imageCount=0;

     function uploadImage(string memory _imgHash,string memory _description) public{
          require(bytes(_imgHash).length >0,"Image Hash lenght is less than 1");
          require(bytes(_description).length >0,"Description lenght is less than 1");

          require(author ==msg.sender,"An author should be same")

          imageCount +=1;

          images[imageCount] =Image(imageCount,_imgHash,_description,0,msg.sender);

          emit ImageCreated(imageCount,_imgHash,_description,0,msg.sender);
     }

     function  tipImageUpload(uint _id) public{
          require(_id > 0 && _id <= imageCount,"Id is invalid");
          Image memeory _image = images[_id];

          address payable _author = _image.author;

          address(_author).transfer(msg.value);

          _image.tipAmount += msg.value;

          // Update the image
          images[_id] =_image;

           emit ImageTipped(_id,_image.hash,_image.description,_image.tipAmount,_author);
     }




}