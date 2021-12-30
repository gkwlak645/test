class camera {
    constructor(x, y, a, dis, width, per_px) {
        this.x = x;
        this.y = y;
        this.a = a;
        this.dis = dis;
        this.per_px = per_px;
        this.width = width;
        this.rays = [];
        let norVec = [Math.cos(this.a - Math.PI/2), Math.sin(this.a - Math.PI/2)];
        for(let i = 0; i < this.per_px; i++) {
            let dis2 = this.width / 2 - i * (this.width / this.per_px);
            let a2 = Math.atan2(norVec[1] * dis2 + Math.sin(this.a) * this.dis, norVec[0] * dis2 + Math.cos(this.a) * this.dis);
            this.rays.push(new Ray(100, 200, a2, 'red'));
        }
    }
    moveat(x, y) {
        this.x = x;
        this.y = y;
        for(let i = 0; i < this.rays.length; i++)
            this.rays[i].moveat(x, y);
    }
    turn(a) {
        this.a += a;
        for(let i = 0; i < this.rays.length; i++)
            this.rays[i].turn(a);
    }
    cast(walls, ctx, ctx_3d) {
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
                
                const a1 = Math.atan2(this.rays[i].dir[1], this.rays[i].dir[1]) - this.a;
                const a2 = Math.PI / 2 - a1;
                let dis1 = Math.cos(a1) * this.dis + Math.cos(a2) * this.width/2;
                dis1 = Math.pow(dis1, 2);
                dis1 = Math.sqrt(dis1);
                const dis2 = this.rays[i].dis;
                const wall_h = cnv_height * dis1 / dis2;
                if(i == 0) {
                    console.log(dis1, dis2);
                }
                let r_v = 205 * dis1 / dis2;
                ctx_3d.fillStyle = 'rgb(0, 0, ' + (r_v + 50) + ')';
                ctx_3d.fillRect(wall_x, (cnv_height - wall_h) / 2, cnv_width / this.rays.length + 1, wall_h);
                if(this.rays[i].color == 'yellow') {
                    ctx_3d.strokeStyle = 'white';
                    ctx_3d.strokeRect(wall_x, (cnv_height - wall_h) / 2, cnv_width / this.rays.length + 1, wall_h);
                }
            }
        }
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + Math.cos(this.a) * this.dis, this.y + Math.sin(this.a) * this.dis);
        ctx.closePath();
        ctx.strokeStyle = 'white';
        ctx.stroke();
        const a2 = Math.atan2(this.width/2, this.dis);
        const dis2 = Math.sqrt(Math.pow(this.width/2, 2) + Math.pow(this.dis, 2));
        ctx.beginPath();
        ctx.moveTo(this.x + Math.cos(this.a + a2) * dis2, this.y + Math.sin(this.a + a2) * dis2);
        ctx.lineTo(this.x + Math.cos(this.a + a2) * dis2 + Math.cos(this.a - Math.PI/2) * this.width, this.y + Math.sin(this.a + a2) * dis2 + Math.sin(this.a - Math.PI/2) * this.width);
        ctx.closePath();
        ctx.strokeStyle = 'green';
        ctx.stroke();
    }
}