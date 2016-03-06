##PiR.tv (Pirate TV)
-------------------

### Installation
Must have Node.js installed on the Raspberry Pi. To install Node follow this [link](https://github.com/DonaldDerek/rPi-cheat-sheet)

```
	git clone https://github.com/DonaldDerek/PiR.tv.git 
	cd PiR.tv/
	npm install
	npm start
```	
###Todo

+ ~~Change repo name to PiRtv~~ 
+ Add [torrent-stream](https://github.com/mafintosh/torrent-stream) The low level streaming torrent engine that [peerflix](https://github.com/mafintosh/peerflix) uses, of which [Popcorn Time](https://github.com/popcorn-team/popcorn-app) is based on
+ Add media sync
+ Add IMDB API
+ Add support to VLC
+ Front-end JS Code refactor
+ Add Channels other than Youtube
+ Stream music from Soundcloud and Jamendo

### Birth
This project was born during a workshop given at [Lamba Labs - Beirut Hacker Space](http://lambalabs.org/) and it was announced during the [Google IO Extend Beirut 2013 Event](https://plus.google.com/u/0/events/cp2togh80nq76q6p301ed3vkodo) Organized by [GDG-Beirut](https://plus.google.com/u/0/102062106640051908932)

![alt text](http://blog.donaldderek.com/wp-content/uploads/2013/06/front_end_raspberry_pi_tv.png "RaspberryPi TV")

Find the orignal post on my [blog](http://blog.donaldderek.com/2013/06/build-your-own-google-tv-using-raspberrypi-nodejs-and-socket-io/)

###Interesting Forks
-------------------
* [Angular-rPiTV](https://github.com/viperfx/angular-rpitv) by [ViperFx](https://github.com/viperfx)
* [Node-mc](https://github.com/dogonthehorizon/node-mc) by [Fernando Freire](https://github.com/dogonthehorizon/)
* [rPiTV-Remote-Android](https://github.com/MelonSmasher/rPiTV-Remote-Android) by [MelonSmasher](https://github.com/melonsmasher/)


###License
----------

The MIT License (MIT)

Copyright (c) 2013 Donald Derek Haddad 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
