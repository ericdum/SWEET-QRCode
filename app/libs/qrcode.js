/*
 * angular-qrcode v2.0.0
 * (c) 2013 Monospaced http://monospaced.com
 * License: MIT
 */

angular.module('monospaced.qrcode', [])
  .directive('qrcode', ['$timeout', '$window', function($timeout, $window){

    var canvas2D = !!$window.CanvasRenderingContext2D,
        levels = {
          'L': 'Low',
          'M': 'Medium',
          'Q': 'Quartile',
          'H': 'High'
        },
        draw = function(context, qr, modules, tile){
          for (var row = 0; row < modules; row++) {
            for (var col = 0; col < modules; col++) {
              var w = (Math.ceil((col + 1) * tile) - Math.floor(col * tile)),
                  h = (Math.ceil((row + 1) * tile) - Math.floor(row * tile));
              context.fillStyle = qr.isDark(row, col) ? '#000' : '#fff';
              context.fillRect(Math.round(col * tile), Math.round(row * tile), w, h);
            }
          }
        };

    return {
      restrict: 'E',
      template: '<canvas></canvas><img style="display:none" />',
      link: function(scope, element, attrs){

        var domElement = element[0],
            canvas = element.find('canvas')[0],
            img = element.find('img')[0],
            version = Math.max(1, Math.min(parseInt(attrs.version, 10), 10)) || 4,
            correction = attrs.errorCorrectionLevel in levels ? attrs.errorCorrectionLevel : 1,
            trim = /^\s+|\s+$/g,
            qr = qrcode(version, correction);

        qr.make();

        var modules = qr.getModuleCount(),
            size = attrs.size,
            getTile = function(qr){
                var modules = qr.getModuleCount(),
                    sizei = parseInt(size, 10) || modules * 2 ;
                return sizei / modules;
            },
            render = function(qr, text){
              qr.addData(text);
              qr.make();
              var tile = getTile(qr);
                draw(context, qr, qr.getModuleCount(), tile);
                context.save();
                img.src=canvas.toDataURL();
                showImg();
            },
            callqr = function (version, text){
                qr = qrcode(version, correction);
                try{
                    render(qr, text);
                }catch(e){
                    if(version < 10){
                        callqr(version+1, text);
                    } else {
                        showCanvas();
                        context.fillStyle="ffffff";
                        context.fillRect(0,0,200,200);
                        context.font="20px sans-serif";
                        context.textAlign="center";
                        context.textBaseline="middle";
                        context.fillStyle="#292424";
                        context.fillText("内容过长",100,100);
                    }
                }
            },
            showCanvas = function(){
                img.style.display = "none";
                canvas.style.display = "block";
            },
            showImg = function(){
                img.style.display = "block";
                canvas.style.display = "none";
            };

        if (canvas2D) {
          var context = canvas.getContext('2d');
          canvas.width = canvas.height = size;
          img.width = img.height = size;
        }

        attrs.$observe('data', function(value){
          if (!value) {
            return;
          }
          var text = value.replace(trim, '');
          callqr(version, text);

        });
      }
    };
  }]);
