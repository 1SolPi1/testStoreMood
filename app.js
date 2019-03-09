new Vue ({

	el: '#root',
	data(){

		return{
			dragAndDropCapable: false,
			filesData: []
			
		}
	},
	methods:{
	 loadFiles: function(event) {
            let files = event.target.files[0];
            let type = files.name.split(".");
                if(files.type.indexOf('image')!==-1){
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.filesData.push({
                    	image: e.target.result,
                    	type: type[type.length - 1],
                    	size: (files.size / 1000).toFixed(2)

                    });
                }
                reader.readAsDataURL(files);
                }else{
                  this.filesData.push({
                    	image: null,
                    	type: type[type.length - 1],
                    	size: (files.size / 1000).toFixed(2)

                    });
                }
        },
        determineDragAndDropCapable(){
  let div = document.createElement('div');
  return ( ( 'draggable' in div )
          || ( 'ondragstart' in div && 'ondrop' in div ) )
          && 'FormData' in window
          && 'FileReader' in window;
},

loadDropFiles: function(event) {
            let type = event.name.split(".");
                if(event.type.indexOf('image')!==-1){
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.filesData.push({
                    	image: e.target.result,
                    	type: type[type.length - 1],
                    	size: (event.size / 1000)

                    });
                }
                reader.readAsDataURL(event);
                }else{
                  this.filesData.push({
                    	image: null,
                    	type: type[type.length - 1],
                    	size: (event.size / 1000)

                    });
                }
        },
	
	},
	mounted(){
		this.dragAndDropCapable = this.determineDragAndDropCapable();
  if( this.dragAndDropCapable ){
    ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function( evt ) {
    
      this.$refs.fileform.addEventListener(evt, function(e){
        e.preventDefault();
        e.stopPropagation();
      }.bind(this), false);
    }.bind(this));
    this.$refs.fileform.addEventListener('drop', function(e){
      for( let i = 0; i < e.dataTransfer.files.length; i++ ){
        this.loadDropFiles(e.dataTransfer.files[i]);
      }
    }.bind(this));
  }
	},

});