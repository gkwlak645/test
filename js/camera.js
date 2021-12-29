class camera {
    constructor(x, y, a, w_p) {
        this.screen = {};
        this.x = x;
        this.y = y;
        this.a = a;
        this.w_p = w_p;
        this.rays = [];
        for(let i = 0; i < w_p; i++) {
            let r_a = 50 - (i / w_p * 100);
            if(this.a == r_a)
                this.rays.push(new Ray(100, 200, r_a / 180 * Math.PI, 'yellow'));
            else
                this.rays.push(new Ray(100, 200, r_a / 180 * Math.PI, 'red'));
        }
    }
    moveat(x, y) {
        for(let i = 0; i < this.rays.length; i++)
            this.rays[i].moveat(x, y);
    }
    turn(a) {
        this.a += a;
        for(let i = 0; i < this.rays.length; i++)
            this.rays[i].turn(a);
    }
    cast(walls, ctx) {
        for(let i = 0; i < this.rays.length; i++) {
            let pt = this.rays[i].cast(walls);
            if(pt) {
                this.rays[i].show();
                ctx.beginPath()
                ctx.arc(pt[0], pt[1], 1, 0, Math.PI * 2);
                ctx.closePath()
                ctx.fillStyle = 'red';
                ctx.fill();
                //3d 렌더링
                let wall_x = (cnv_width / this.rays.length) * i;
                let max_dis = Math.sqrt(Math.pow(cnv_height,2) + Math.pow(cnv_width,2));
                let dis = Math.cos(this.a - Math.atan2(this.rays[i].dir[1], this.rays[i].dir[0])) * this.rays[i].dis;
                let wall_h = cnv_height * (1 - (this.rays[i].dis / max_dis));
                let r_v = 255 * (1 - (this.rays[i].dis / max_dis));
                ctx.fillStyle = 'rgb(0, 0, ' + r_v + ')';
                ctx.fillRect(wall_x, (cnv_height - wall_h) / 2, cnv_width / this.rays.length + 1, wall_h);
                if(this.rays[i].color == 'yellow') {
                    ctx.strokeStyle = 'white';
                    ctx.strokeRect(wall_x, (cnv_height - wall_h) / 2, cnv_width / this.rays.length + 1, wall_h);
                }
            }
        }
    }
}