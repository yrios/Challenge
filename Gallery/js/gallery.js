//By Yofret Rios
//Gallery Object

/*
*	Gallery object definition
*/
function Gallery (gallery,_data,_mode) {
	this.gallery = document.getElementById(gallery);
	this.data = _data;  // data field is an img array that looks like this [{src:"imgsrc",desc:"img desc"},{src:"imgsrc",desc:"img desc"}]
	this.mode = _mode;  //Specify the mode of the Widget (gallery/single);
	this.currentImg = 0;
	this.numberSlides = 0;
	this.navslide = null;
}

/*
* Gallery Object implementation
* 
*/
Gallery.prototype = {
	init : function(){
		if(this.mode == "single"){
			this.render();
			this.navigation();
		}else if(this.mode == "gallery"){
			this.render();
			this.navigation();
		}else{
			console.log("invalid mode");
		}
	},


	/*
	* Function slide: this function controls the slide of the widget itself
	*/
	slide : function(){
		this.numberSlides = this.data.length;
		this.currentImg = (this.currentImg + 1) % this.numberSlides;
		this.display();
	},

	/*
	* Function navigate: this function add the event listener for the slider, this functions 
	*  calls slide every time that the user clicks on the main area of the slider
	*/
	navigation: function(){
		var self = this;
		this.navslide = this.find();
		this.navslide.addEventListener('click',function(){
			self.slide();
		});

		
	},

	/*
	* Function render: this function renders all the elements on the specified id.
	*/
	render: function(){
		var div = document.createElement("div");
		div.setAttribute("width","400px");
		div.setAttribute("class","slider");

		var img = document.createElement("img");
		img.setAttribute("src", this.data[0].src);
		div.appendChild(img);
		this.gallery.appendChild(div);
	},

	/*
	* Function display: this function displays changes the images for the next one in the slider
	*/
	display: function(){
		var img = this.findImg();
		img.setAttribute("src", this.data[this.currentImg].src);
	},

	/*
	* Function Find: this function returns the main slide element
	*/
	find:function(){
		var div = this.gallery.children;
		var children;
		for (var i = 0; i < div.length; i++) {
			if(div[i].className == "slider"){
				var children = div[i];
			}
		};
		return children;
	},

	/*
	* Find the main img, this img will be used to changed the current
	* image reference
	*/
	findImg:function(){
		var div = this.find();
		var img = div.getElementsByTagName("img");
		return img[0];
	}
}