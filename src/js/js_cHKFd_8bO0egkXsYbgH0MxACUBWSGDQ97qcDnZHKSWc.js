! function(a, b, c) {
  "use strict";
  var d = !1,
      e = !1,
      f = Modernizr.csspositionsticky;
  new(function(a) {
      function b() {
          c = this, this.setVars(), this.setEvents()
      }
      var c, g = a(window).height(),
          h = a(window).width(),
          i = h < 767,
          j = 60,
          k = 0,
          l = 0,
          m = 0,
          n = 0,
          o = !1;
      b.prototype.setVars = function() {
          this.container = a(".product-hero .container"), this.$top_el = a(".field-top"), o = this.$top_el.length > 0, this.step_1 = {
              $parent: a("#bready_animate_1"),
              $holder: a("#holder_1"),
              $sprite: a("#sprite_1"),
              steps: 31,
              current: 0
          }, this.step_2 = {
              $parent: a("#bready_step_2"),
              $parent2: a("#bready_animate_2"),
              $holder: a("#holder_2"),
              $sprite: a("#sprite_2"),
              steps: 23,
              current: 0
          }, this.update()
      }, b.prototype.update = function() {
          (h = a(window).width()) !== m && (m = h, g = a(window).height(), i = h < 767, n = o ? this.$top_el.height() : 0, j = this.container.width() * (i ? -.2 : .05), this.step_1.$imgW = i ? 1.6 * h : this.step_1.$parent.width(), this.step_1.$sprite.css({
              width: this.step_1.$imgW,
              left: i ? "-29%" : .1 * this.step_1.$imgW
          }), this.step_2.$sprite.css({
              width: this.step_1.$imgW,
              left: i ? "0" : .1 * this.step_1.$imgW
          }), this.step_1.top = this.step_1.$parent.offset().top - n, this.step_1.left = this.step_1.$parent.offset().left, this.step_2.top = this.step_2.$parent.offset().top - n, this.step_1.duration = this.step_2.top - this.step_1.top, this.step_1.maxTop = this.step_1.duration - this.step_1.top, this.step_1.$parent.height(this.step_1.duration + this.step_2.$sprite.outerHeight() - j), f ? (this.step_1.$holder.css({
              top: this.step_1.top
          }), this.step_2.$parent2.height(this.step_1.duration + this.step_2.$sprite.outerHeight() - j), this.step_2.$parent2.css({
              "margin-top": this.step_1.$parent.offset().top - this.step_2.$parent.offset().top
          }), this.step_2.$holder.css({
              top: this.step_1.top
          })) : this.step_2.$parent2.height(this.step_1.$imgW), i || this.step_1.$holder.css({
              width: this.step_1.$imgW
          }), this.step_2.$imgW = this.step_2.$sprite.width(), this.step_2.diff = i ? 180 : 0, this.step_2.diffY = a(".field-medias .item").height(), a(window).trigger("scroll"))
      }, b.prototype.setEvents = function() {
          a(window).on("resize load", function() {
              c.update()
          }).on("scroll", function() {
              c.scroller(a(window).scrollTop())
          }), a("#tap-here").on("click", function() {
              d = !0, e = !0;
              var a = setInterval(function() {
                  if (c.setSprite2(), c.step_2.current === c.step_2.steps - 1) return e = !1, void clearInterval(a);
                  c.step_2.current++
              }, 50)
          })
      }, b.prototype.animate_1 = function(a) {
          if (!((a -= n) < 0)) {
              if (i) {
                  var b = Math.floor(a / this.step_1.duration * this.step_1.steps);
                  b = i ? b > 16 ? 16 : b : 0, this.step_1.$sprite.css({
                      transform: "translate3d(" + b + "%,0, 0)"
                  })
              }
              var c = Math.floor(a * (this.step_1.steps / this.step_1.duration));
              c >= 24 ? this.step_1.$holder.hide() : this.step_1.$holder.show(), c < 31 && c >= 0 ? c !== this.step_1.current && (this.step_1.current = c, this.setSprite1()) : (this.step_1.current = this.step_1.steps - 1, this.setSprite1())
          }
      }, b.prototype.setSprite1 = function() {
          k !== this.step_1.current && (this.step_1.$sprite.css({
              "background-position": -this.step_1.current * this.step_1.$imgW + "px 0"
          }), k = this.step_1.current)
      }, b.prototype.setSprite2 = function() {
          l !== this.step_2.current && (this.step_2.$sprite.css({
              "background-position": -this.step_2.current * this.step_2.$imgW + "px 0"
          }), l = this.step_2.current, this.step_2.$parent.toggleClass("active", 12 === this.step_2.current))
      }, b.prototype.animate_2 = function(a) {
          if ((a -= n) < 0) return void(f || (this.step_1.$holder.css({
              position: "absolute",
              left: 0,
              top: 0,
              bottom: "auto"
          }), this.step_2.$holder.css({
              position: "absolute",
              left: 0,
              top: "auto",
              bottom: 0
          })));
          var b = Math.round(a - this.step_2.top + .2 * this.step_2.$imgW),
              c = a - this.step_2.top + 1.2 * this.step_2.$imgW,
              d = a - this.step_2.top + this.step_2.diffY;
          if (c > 0 ? (this.step_2.$holder.css("opacity", 1), this.step_1.$holder.css("opacity", 0)) : (this.step_2.$holder.css("opacity", 0), this.step_1.$holder.css("opacity", 1)), f || (b > 0 ? (this.step_1.$holder.css({
                  position: "absolute",
                  left: 0,
                  top: "auto",
                  bottom: 0
              }), this.step_2.$holder.css({
                  position: "absolute",
                  left: 0,
                  top: "auto",
                  bottom: 0
              })) : (this.step_1.$holder.css({
                  position: "fixed",
                  left: this.step_1.left,
                  top: this.step_1.top,
                  bottom: "auto"
              }), this.step_2.$holder.css({
                  position: "fixed",
                  left: this.step_1.left,
                  top: this.step_1.top,
                  bottom: "auto"
              }))), d <= 0) this.step_2.current = 0, this.setSprite2();
          else if (b < this.step_2.diff && d > 0) {
              var e = 12 - Math.floor(Math.abs(b - this.step_2.diff) / (Math.abs(b - d - this.step_2.diff) / 12));
              this.step_2.current !== e && (this.step_2.current = e, this.setSprite2())
          } else this.step_2.current = this.step_2.current > 12 ? this.step_2.current : 12, this.setSprite2()
      };
      return b.prototype.scroller = function(a) {
          c.animate_1(a), c.animate_2(a)
      }, b
  }(jQuery))
}(jQuery, Drupal, drupalSettings);;
/**
* @file
* JS file.
*/

