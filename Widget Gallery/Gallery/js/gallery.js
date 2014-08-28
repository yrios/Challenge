//By Yofret Rios
//Gallery Object

/*
*	Gallery object definition
*/
function Gallery (gallery,_data,_mode) {
	this.gallery = document.getElementById(gallery);
	this.data = _data;  	// data field is an img array that looks like this [{src:"imgsrc",desc:"img desc"},{src:"imgsrc",desc:"img desc"}]
	this.mode = _mode;  	//Specify the mode of the Widget ("gallery"/"single");
	this.currentImg = 0;	//First image displayed
	this.selected = null;
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
			this.renderSingle();
			this.navigationSingle();
		}else if(this.mode == "gallery"){
			this.renderGallery();
			this.navigationGallery();
		}else{
			console.log("invalid mode");
		}
	},

	/*
	* Function slide: this function controls the slide of the widget in single mode
	*/
	slide : function(){
		this.numberSlides = this.data.length;
		this.currentImg = (this.currentImg + 1) % this.numberSlides;
		this.display();
	},

	/*
	* Function select: this function controls the selection of the widget in gallery mode
	*/
	select: function(x){
		this.currentImg = x;
		this.display();
	},

	/*
	* Function navigate in single mode: this function add the event listener for the slider, this functions 
	*  calls "slide" every time that the user clicks on the main area of the slider
	*/
	navigationSingle: function(){
		var self = this;
		this.navslide = this.find();
		this.navslide.addEventListener('click',function(){
			self.slide();
		});
	},

	/*
	*Function navigate in gallery mode: this function add the event listener to the
	* thumnails container, and calls "select" every time the user clicks on any of the thumbnails presented.
	*/
	navigationGallery: function(){
		var self = this;
		this.navslide = this.find();
		this.thumbnails = this.navslide.lastChild;
		this.thumbnails.addEventListener('click', function(e){
			this.selected = e.target.id;
			self.select(this.selected)
		});
	},

	/*
	* Function renderSingle: this function renders all the elements on the specified id, in single mode.
	*/
	renderSingle: function(){
		var div = document.createElement("div");
		div.setAttribute("class","slider");

		var img = document.createElement("img");
		img.setAttribute("src", this.data[0].src);
		div.appendChild(img);
		this.gallery.appendChild(div); // set to the main gallery container
	}, 

	/*
	* Function renderGallery: this function renders all the elements on the specified id, in gallery mode.
	*/
	renderGallery: function(){
		//Slider div
		var div = document.createElement("div");
		div.setAttribute("class","slider");

		//----main-slide
		var img = document.createElement("img");
		img.setAttribute("src", this.data[0].src);
		//--end main slide

		//---scrollable div
		var divscrollable = document.createElement("div");
		divscrollable.setAttribute("class","scrollable-tumbnail");

		for (var i = 0; i < this.data.length; i++) {
			var thumbnail = document.createElement("div");
			thumbnail.setAttribute("id",i);
			var imgthumbnail = document.createElement("img");
			imgthumbnail.setAttribute("src", this.data[i].src);
			imgthumbnail.setAttribute("id",i);
			thumbnail.appendChild(imgthumbnail);
			divscrollable.appendChild(thumbnail);
		};
		//---End scrollable div

		div.appendChild(img);
		div.appendChild(divscrollable);

		this.gallery.appendChild(div); // set to the main gallery container.
	},

	/*
	* Function display: this function  changes the current displayed image for the image in the pasition "x" of the data.
	*/
	display: function(){
		var img = this.findImg();
		img.setAttribute("src", this.data[this.currentImg].src);
	},

	/*
	* Function Find: this function returns the main slide element.
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
	* image reference.
	*/
	findImg:function(){
		var div = this.find();
		var img = div.getElementsByTagName("img");
		return img[0];
	}
}