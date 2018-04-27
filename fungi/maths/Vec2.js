class Vec2 extends Float32Array{
	constructor(ini){
		super(2);

		if(ini instanceof Vec2 || (ini && ini.length == 2)){	this[0] = ini[0];		this[1] = ini[1]; }
		else if(arguments.length == 2){ 						this[0] = arguments[0];	this[1] = arguments[1]; }
		else{													this[0] = this[1] = ini || 0; }
	}

	//----------------------------------------------
	//Getters and Setters
		get x(){ return this[0]; }	set x(val){ this[0] = val; }
		get y(){ return this[1]; }	set y(val){ this[1] = val; }
		set(x,y){ this[0] = x; this[1] = y; return this;}

		clone(){ return new Vec2(this); }
		copy(v){ this[0] = v[0]; this[1] = v[1]; return this; }

		//When values are very small, like less then 0.000001, just make it zero.
		nearZero(){
			if(Math.abs(this[0]) <= 1e-6) this[0] = 0;
			if(Math.abs(this[1]) <= 1e-6) this[1] = 0;
			return this;
		}	
	//endregion


	//----------------------------------------------
	// Methods
		length(v){
			//Only get the magnitude of this vector
			if(v === undefined) return Math.sqrt( this[0]*this[0] + this[1]*this[1] );

			//Get magnitude based on another vector
			var x = this[0] - v[0],
				y = this[1] - v[1];

			return Math.sqrt( x*x + y*y );
		}
		
		lengthSqr(v){
			//Only get the squared magnitude of this vector
			if(v === undefined) return this[0]*this[0] + this[1]*this[1];

			//Get squared magnitude based on another vector
			var x = this[0] - v[0],
				y = this[1] - v[1];

			return x*x + y*y;
		}

		normalize(out){
			var mag = Math.sqrt( this[0]*this[0] + this[1]*this[1] );
			if(mag == 0) return this;

			out = out || this;
			out[0] = this[0] / mag;
			out[1] = this[1] / mag;

			return this;
		}

		lerp(v, t, out){
			if(out == null) out = this;
			var tMin1 = 1 - t;

			//Linear Interpolation : (1 - t) * v0 + t * v1;
			out[0] = this[0] * tMin1 + v[0] * t;
			out[1] = this[1] * tMin1 + v[1] * t;
			return out;
		}

		rotate(ang, out){
			if(out == null) out = this;

			var cos = Math.cos(ang),
				sin = Math.sin(ang),
				x = this[0],
				y = this[1];

			out[0] = x * cos - y * sin;
			out[1] = x * sin + y * cos;
			return out;
		}
	//endregion

	//----------------------------------------------
	// Math
		add(v, out=null){
			out = out || this;
			out[0] = this[0] + v[0];
			out[1] = this[1] + v[1];
			return this;
		}

		addXY(x, y, out=null){
			out = out || this;
			out[0] = this[0] + x;
			out[1] = this[1] + y;
			return this;
		}

		sub(v, out=null){
			out = out || this;
			out[0] = this[0] - v[0];
			out[1] = this[1] - v[1];
			return this;
		}

		mul(v, out=null){
			out = out || this;
			out[0] = this[0] * v[0];
			out[1] = this[1] * v[1];
			return this;
		}

		div(v, out=null){
			out = out || this;
			out[0] = (v[0] != 0)? this[0] / v[0] : 0;
			out[1] = (v[1] != 0)? this[1] / v[1] : 0;
			return this;
		}

		scale(v, out=null){
			out = out || this;
			out[0] = this[0] * v;
			out[1] = this[1] * v;
			return this;
		}

		divInvScale(v, out=null){
			out = out || this;
			out[0] = (this[0] != 0)? v / this[0] : 0;
			out[1] = (this[1] != 0)? v / this[1] : 0;
			return this;
		}
	//endregion
}

export default Vec2;