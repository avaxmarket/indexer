(self.webpackChunk=self.webpackChunk||[]).push([[174],{1182:function(_){function j(k,F){(F==null||F>k.length)&&(F=k.length);for(var R=0,d=new Array(F);R<F;R++)d[R]=k[R];return d}_.exports=j,_.exports.__esModule=!0,_.exports.default=_.exports},1999:function(_){function j(k){if(Array.isArray(k))return k}_.exports=j,_.exports.__esModule=!0,_.exports.default=_.exports},8616:function(_){function j(k,F){var R=k==null?null:typeof Symbol!="undefined"&&k[Symbol.iterator]||k["@@iterator"];if(R!=null){var d,T,H,D,O=[],ee=!0,oe=!1;try{if(H=(R=R.call(k)).next,F===0){if(Object(R)!==R)return;ee=!1}else for(;!(ee=(d=H.call(R)).done)&&(O.push(d.value),O.length!==F);ee=!0);}catch(J){oe=!0,T=J}finally{try{if(!ee&&R.return!=null&&(D=R.return(),Object(D)!==D))return}finally{if(oe)throw T}}return O}}_.exports=j,_.exports.__esModule=!0,_.exports.default=_.exports},4785:function(_){function j(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}_.exports=j,_.exports.__esModule=!0,_.exports.default=_.exports},8152:function(_,j,k){var F=k(1999),R=k(8616),d=k(1533),T=k(4785);function H(D,O){return F(D)||R(D,O)||d(D,O)||T()}_.exports=H,_.exports.__esModule=!0,_.exports.default=_.exports},1533:function(_,j,k){var F=k(1182);function R(d,T){if(d){if(typeof d=="string")return F(d,T);var H=Object.prototype.toString.call(d).slice(8,-1);if(H==="Object"&&d.constructor&&(H=d.constructor.name),H==="Map"||H==="Set")return Array.from(d);if(H==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(H))return F(d,T)}}_.exports=R,_.exports.__esModule=!0,_.exports.default=_.exports},1562:function(_,j,k){"use strict";var F=/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,R=Math.ceil,d=Math.floor,T="[BigNumber Error] ",H=T+"Number primitive has more than 15 significant digits: ",D=1e14,O=14,ee=9007199254740991,oe=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],J=1e7,U=1e9;function Ne(N){var E,y,L,p=h.prototype={constructor:h,toString:null,valueOf:null},P=new h(1),v=20,I=4,$=-7,z=21,ne=-1e7,Z=1e7,ie=!1,se=1,re=0,he={prefix:"",groupSize:3,secondaryGroupSize:0,groupSeparator:",",decimalSeparator:".",fractionGroupSize:0,fractionGroupSeparator:"\xA0",suffix:""},fe="0123456789abcdefghijklmnopqrstuvwxyz",pe=!0;function h(e,r){var t,l,i,o,c,n,f,u,s=this;if(!(s instanceof h))return new h(e,r);if(r==null){if(e&&e._isBigNumber===!0){s.s=e.s,!e.c||e.e>Z?s.c=s.e=null:e.e<ne?s.c=[s.e=0]:(s.e=e.e,s.c=e.c.slice());return}if((n=typeof e=="number")&&e*0==0){if(s.s=1/e<0?(e=-e,-1):1,e===~~e){for(o=0,c=e;c>=10;c/=10,o++);o>Z?s.c=s.e=null:(s.e=o,s.c=[e]);return}u=String(e)}else{if(!F.test(u=String(e)))return L(s,u,n);s.s=u.charCodeAt(0)==45?(u=u.slice(1),-1):1}(o=u.indexOf("."))>-1&&(u=u.replace(".","")),(c=u.search(/e/i))>0?(o<0&&(o=c),o+=+u.slice(c+1),u=u.substring(0,c)):o<0&&(o=u.length)}else{if(S(r,2,fe.length,"Base"),r==10&&pe)return s=new h(e),V(s,v+s.e+1,I);if(u=String(e),n=typeof e=="number"){if(e*0!=0)return L(s,u,n,r);if(s.s=1/e<0?(u=u.slice(1),-1):1,h.DEBUG&&u.replace(/^0\.0*|\./,"").length>15)throw Error(H+e)}else s.s=u.charCodeAt(0)===45?(u=u.slice(1),-1):1;for(t=fe.slice(0,r),o=c=0,f=u.length;c<f;c++)if(t.indexOf(l=u.charAt(c))<0){if(l=="."){if(c>o){o=f;continue}}else if(!i&&(u==u.toUpperCase()&&(u=u.toLowerCase())||u==u.toLowerCase()&&(u=u.toUpperCase()))){i=!0,c=-1,o=0;continue}return L(s,String(e),n,r)}n=!1,u=y(u,r,10,s.s),(o=u.indexOf("."))>-1?u=u.replace(".",""):o=u.length}for(c=0;u.charCodeAt(c)===48;c++);for(f=u.length;u.charCodeAt(--f)===48;);if(u=u.slice(c,++f)){if(f-=c,n&&h.DEBUG&&f>15&&(e>ee||e!==d(e)))throw Error(H+s.s*e);if((o=o-c-1)>Z)s.c=s.e=null;else if(o<ne)s.c=[s.e=0];else{if(s.e=o,s.c=[],c=(o+1)%O,o<0&&(c+=O),c<f){for(c&&s.c.push(+u.slice(0,c)),f-=O;c<f;)s.c.push(+u.slice(c,c+=O));c=O-(u=u.slice(c)).length}else c-=f;for(;c--;u+="0");s.c.push(+u)}}else s.c=[s.e=0]}h.clone=Ne,h.ROUND_UP=0,h.ROUND_DOWN=1,h.ROUND_CEIL=2,h.ROUND_FLOOR=3,h.ROUND_HALF_UP=4,h.ROUND_HALF_DOWN=5,h.ROUND_HALF_EVEN=6,h.ROUND_HALF_CEIL=7,h.ROUND_HALF_FLOOR=8,h.EUCLID=9,h.config=h.set=function(e){var r,t;if(e!=null)if(typeof e=="object"){if(e.hasOwnProperty(r="DECIMAL_PLACES")&&(t=e[r],S(t,0,U,r),v=t),e.hasOwnProperty(r="ROUNDING_MODE")&&(t=e[r],S(t,0,8,r),I=t),e.hasOwnProperty(r="EXPONENTIAL_AT")&&(t=e[r],t&&t.pop?(S(t[0],-U,0,r),S(t[1],0,U,r),$=t[0],z=t[1]):(S(t,-U,U,r),$=-(z=t<0?-t:t))),e.hasOwnProperty(r="RANGE"))if(t=e[r],t&&t.pop)S(t[0],-U,-1,r),S(t[1],1,U,r),ne=t[0],Z=t[1];else if(S(t,-U,U,r),t)ne=-(Z=t<0?-t:t);else throw Error(T+r+" cannot be zero: "+t);if(e.hasOwnProperty(r="CRYPTO"))if(t=e[r],t===!!t)if(t)if(typeof crypto!="undefined"&&crypto&&(crypto.getRandomValues||crypto.randomBytes))ie=t;else throw ie=!t,Error(T+"crypto unavailable");else ie=t;else throw Error(T+r+" not true or false: "+t);if(e.hasOwnProperty(r="MODULO_MODE")&&(t=e[r],S(t,0,9,r),se=t),e.hasOwnProperty(r="POW_PRECISION")&&(t=e[r],S(t,0,U,r),re=t),e.hasOwnProperty(r="FORMAT"))if(t=e[r],typeof t=="object")he=t;else throw Error(T+r+" not an object: "+t);if(e.hasOwnProperty(r="ALPHABET"))if(t=e[r],typeof t=="string"&&!/^.?$|[+\-.\s]|(.).*\1/.test(t))pe=t.slice(0,10)=="0123456789",fe=t;else throw Error(T+r+" invalid: "+t)}else throw Error(T+"Object expected: "+e);return{DECIMAL_PLACES:v,ROUNDING_MODE:I,EXPONENTIAL_AT:[$,z],RANGE:[ne,Z],CRYPTO:ie,MODULO_MODE:se,POW_PRECISION:re,FORMAT:he,ALPHABET:fe}},h.isBigNumber=function(e){if(!e||e._isBigNumber!==!0)return!1;if(!h.DEBUG)return!0;var r,t,l=e.c,i=e.e,o=e.s;e:if({}.toString.call(l)=="[object Array]"){if((o===1||o===-1)&&i>=-U&&i<=U&&i===d(i)){if(l[0]===0){if(i===0&&l.length===1)return!0;break e}if(r=(i+1)%O,r<1&&(r+=O),String(l[0]).length==r){for(r=0;r<l.length;r++)if(t=l[r],t<0||t>=D||t!==d(t))break e;if(t!==0)return!0}}}else if(l===null&&i===null&&(o===null||o===1||o===-1))return!0;throw Error(T+"Invalid BigNumber: "+e)},h.maximum=h.max=function(){return xe(arguments,-1)},h.minimum=h.min=function(){return xe(arguments,1)},h.random=function(){var e=9007199254740992,r=Math.random()*e&2097151?function(){return d(Math.random()*e)}:function(){return(Math.random()*1073741824|0)*8388608+(Math.random()*8388608|0)};return function(t){var l,i,o,c,n,f=0,u=[],s=new h(P);if(t==null?t=v:S(t,0,U),c=R(t/O),ie)if(crypto.getRandomValues){for(l=crypto.getRandomValues(new Uint32Array(c*=2));f<c;)n=l[f]*131072+(l[f+1]>>>11),n>=9e15?(i=crypto.getRandomValues(new Uint32Array(2)),l[f]=i[0],l[f+1]=i[1]):(u.push(n%1e14),f+=2);f=c/2}else if(crypto.randomBytes){for(l=crypto.randomBytes(c*=7);f<c;)n=(l[f]&31)*281474976710656+l[f+1]*1099511627776+l[f+2]*4294967296+l[f+3]*16777216+(l[f+4]<<16)+(l[f+5]<<8)+l[f+6],n>=9e15?crypto.randomBytes(7).copy(l,f):(u.push(n%1e14),f+=7);f=c/7}else throw ie=!1,Error(T+"crypto unavailable");if(!ie)for(;f<c;)n=r(),n<9e15&&(u[f++]=n%1e14);for(c=u[--f],t%=O,c&&t&&(n=oe[O-t],u[f]=d(c/n)*n);u[f]===0;u.pop(),f--);if(f<0)u=[o=0];else{for(o=-1;u[0]===0;u.splice(0,1),o-=O);for(f=1,n=u[0];n>=10;n/=10,f++);f<O&&(o-=O-f)}return s.e=o,s.c=u,s}}(),h.sum=function(){for(var e=1,r=arguments,t=new h(r[0]);e<r.length;)t=t.plus(r[e++]);return t},y=function(){var e="0123456789";function r(t,l,i,o){for(var c,n=[0],f,u=0,s=t.length;u<s;){for(f=n.length;f--;n[f]*=l);for(n[0]+=o.indexOf(t.charAt(u++)),c=0;c<n.length;c++)n[c]>i-1&&(n[c+1]==null&&(n[c+1]=0),n[c+1]+=n[c]/i|0,n[c]%=i)}return n.reverse()}return function(t,l,i,o,c){var n,f,u,s,a,g,w,A,M=t.indexOf("."),C=v,x=I;for(M>=0&&(s=re,re=0,t=t.replace(".",""),A=new h(l),g=A.pow(t.length-M),re=s,A.c=r(K(W(g.c),g.e,"0"),10,i,e),A.e=A.c.length),w=r(t,l,i,c?(n=fe,e):(n=e,fe)),u=s=w.length;w[--s]==0;w.pop());if(!w[0])return n.charAt(0);if(M<0?--u:(g.c=w,g.e=u,g.s=o,g=E(g,A,C,x,i),w=g.c,a=g.r,u=g.e),f=u+C+1,M=w[f],s=i/2,a=a||f<0||w[f+1]!=null,a=x<4?(M!=null||a)&&(x==0||x==(g.s<0?3:2)):M>s||M==s&&(x==4||a||x==6&&w[f-1]&1||x==(g.s<0?8:7)),f<1||!w[0])t=a?K(n.charAt(1),-C,n.charAt(0)):n.charAt(0);else{if(w.length=f,a)for(--i;++w[--f]>i;)w[f]=0,f||(++u,w=[1].concat(w));for(s=w.length;!w[--s];);for(M=0,t="";M<=s;t+=n.charAt(w[M++]));t=K(t,u,n.charAt(0))}return t}}(),E=function(){function e(l,i,o){var c,n,f,u,s=0,a=l.length,g=i%J,w=i/J|0;for(l=l.slice();a--;)f=l[a]%J,u=l[a]/J|0,c=w*f+u*g,n=g*f+c%J*J+s,s=(n/o|0)+(c/J|0)+w*u,l[a]=n%o;return s&&(l=[s].concat(l)),l}function r(l,i,o,c){var n,f;if(o!=c)f=o>c?1:-1;else for(n=f=0;n<o;n++)if(l[n]!=i[n]){f=l[n]>i[n]?1:-1;break}return f}function t(l,i,o,c){for(var n=0;o--;)l[o]-=n,n=l[o]<i[o]?1:0,l[o]=n*c+l[o]-i[o];for(;!l[0]&&l.length>1;l.splice(0,1));}return function(l,i,o,c,n){var f,u,s,a,g,w,A,M,C,x,m,G,ae,Oe,Ee,Q,le,Y=l.s==i.s?1:-1,q=l.c,B=i.c;if(!q||!q[0]||!B||!B[0])return new h(!l.s||!i.s||(q?B&&q[0]==B[0]:!B)?NaN:q&&q[0]==0||!B?Y*0:Y/0);for(M=new h(Y),C=M.c=[],u=l.e-i.e,Y=o+u+1,n||(n=D,u=X(l.e/O)-X(i.e/O),Y=Y/O|0),s=0;B[s]==(q[s]||0);s++);if(B[s]>(q[s]||0)&&u--,Y<0)C.push(1),a=!0;else{for(Oe=q.length,Q=B.length,s=0,Y+=2,g=d(n/(B[0]+1)),g>1&&(B=e(B,g,n),q=e(q,g,n),Q=B.length,Oe=q.length),ae=Q,x=q.slice(0,Q),m=x.length;m<Q;x[m++]=0);le=B.slice(),le=[0].concat(le),Ee=B[0],B[1]>=n/2&&Ee++;do{if(g=0,f=r(B,x,Q,m),f<0){if(G=x[0],Q!=m&&(G=G*n+(x[1]||0)),g=d(G/Ee),g>1)for(g>=n&&(g=n-1),w=e(B,g,n),A=w.length,m=x.length;r(w,x,A,m)==1;)g--,t(w,Q<A?le:B,A,n),A=w.length,f=1;else g==0&&(f=g=1),w=B.slice(),A=w.length;if(A<m&&(w=[0].concat(w)),t(x,w,m,n),m=x.length,f==-1)for(;r(B,x,Q,m)<1;)g++,t(x,Q<m?le:B,m,n),m=x.length}else f===0&&(g++,x=[0]);C[s++]=g,x[0]?x[m++]=q[ae]||0:(x=[q[ae]],m=1)}while((ae++<Oe||x[0]!=null)&&Y--);a=x[0]!=null,C[0]||C.splice(0,1)}if(n==D){for(s=1,Y=C[0];Y>=10;Y/=10,s++);V(M,o+(M.e=s+u*O-1)+1,c,a)}else M.e=u,M.r=+a;return M}}();function ge(e,r,t,l){var i,o,c,n,f;if(t==null?t=I:S(t,0,8),!e.c)return e.toString();if(i=e.c[0],c=e.e,r==null)f=W(e.c),f=l==1||l==2&&(c<=$||c>=z)?ce(f,c):K(f,c,"0");else if(e=V(new h(e),r,t),o=e.e,f=W(e.c),n=f.length,l==1||l==2&&(r<=o||o<=$)){for(;n<r;f+="0",n++);f=ce(f,o)}else if(r-=c,f=K(f,o,"0"),o+1>n){if(--r>0)for(f+=".";r--;f+="0");}else if(r+=o-n,r>0)for(o+1==n&&(f+=".");r--;f+="0");return e.s<0&&i?"-"+f:f}function xe(e,r){for(var t,l,i=1,o=new h(e[0]);i<e.length;i++)l=new h(e[i]),(!l.s||(t=te(o,l))===r||t===0&&o.s===r)&&(o=l);return o}function we(e,r,t){for(var l=1,i=r.length;!r[--i];r.pop());for(i=r[0];i>=10;i/=10,l++);return(t=l+t*O-1)>Z?e.c=e.e=null:t<ne?e.c=[e.e=0]:(e.e=t,e.c=r),e}L=function(){var e=/^(-?)0([xbo])(?=\w[\w.]*$)/i,r=/^([^.]+)\.$/,t=/^\.([^.]+)$/,l=/^-?(Infinity|NaN)$/,i=/^\s*\+(?=[\w.])|^\s+|\s+$/g;return function(o,c,n,f){var u,s=n?c:c.replace(i,"");if(l.test(s))o.s=isNaN(s)?null:s<0?-1:1;else{if(!n&&(s=s.replace(e,function(a,g,w){return u=(w=w.toLowerCase())=="x"?16:w=="b"?2:8,!f||f==u?g:a}),f&&(u=f,s=s.replace(r,"$1").replace(t,"0.$1")),c!=s))return new h(s,u);if(h.DEBUG)throw Error(T+"Not a"+(f?" base "+f:"")+" number: "+c);o.s=null}o.c=o.e=null}}();function V(e,r,t,l){var i,o,c,n,f,u,s,a=e.c,g=oe;if(a){e:{for(i=1,n=a[0];n>=10;n/=10,i++);if(o=r-i,o<0)o+=O,c=r,f=a[u=0],s=d(f/g[i-c-1]%10);else if(u=R((o+1)/O),u>=a.length)if(l){for(;a.length<=u;a.push(0));f=s=0,i=1,o%=O,c=o-O+1}else break e;else{for(f=n=a[u],i=1;n>=10;n/=10,i++);o%=O,c=o-O+i,s=c<0?0:d(f/g[i-c-1]%10)}if(l=l||r<0||a[u+1]!=null||(c<0?f:f%g[i-c-1]),l=t<4?(s||l)&&(t==0||t==(e.s<0?3:2)):s>5||s==5&&(t==4||l||t==6&&(o>0?c>0?f/g[i-c]:0:a[u-1])%10&1||t==(e.s<0?8:7)),r<1||!a[0])return a.length=0,l?(r-=e.e+1,a[0]=g[(O-r%O)%O],e.e=-r||0):a[0]=e.e=0,e;if(o==0?(a.length=u,n=1,u--):(a.length=u+1,n=g[O-o],a[u]=c>0?d(f/g[i-c]%g[c])*n:0),l)for(;;)if(u==0){for(o=1,c=a[0];c>=10;c/=10,o++);for(c=a[0]+=n,n=1;c>=10;c/=10,n++);o!=n&&(e.e++,a[0]==D&&(a[0]=1));break}else{if(a[u]+=n,a[u]!=D)break;a[u--]=0,n=1}for(o=a.length;a[--o]===0;a.pop());}e.e>Z?e.c=e.e=null:e.e<ne&&(e.c=[e.e=0])}return e}function b(e){var r,t=e.e;return t===null?e.toString():(r=W(e.c),r=t<=$||t>=z?ce(r,t):K(r,t,"0"),e.s<0?"-"+r:r)}return p.absoluteValue=p.abs=function(){var e=new h(this);return e.s<0&&(e.s=1),e},p.comparedTo=function(e,r){return te(this,new h(e,r))},p.decimalPlaces=p.dp=function(e,r){var t,l,i,o=this;if(e!=null)return S(e,0,U),r==null?r=I:S(r,0,8),V(new h(o),e+o.e+1,r);if(!(t=o.c))return null;if(l=((i=t.length-1)-X(this.e/O))*O,i=t[i])for(;i%10==0;i/=10,l--);return l<0&&(l=0),l},p.dividedBy=p.div=function(e,r){return E(this,new h(e,r),v,I)},p.dividedToIntegerBy=p.idiv=function(e,r){return E(this,new h(e,r),0,1)},p.exponentiatedBy=p.pow=function(e,r){var t,l,i,o,c,n,f,u,s,a=this;if(e=new h(e),e.c&&!e.isInteger())throw Error(T+"Exponent not an integer: "+b(e));if(r!=null&&(r=new h(r)),n=e.e>14,!a.c||!a.c[0]||a.c[0]==1&&!a.e&&a.c.length==1||!e.c||!e.c[0])return s=new h(Math.pow(+b(a),n?e.s*(2-ue(e)):+b(e))),r?s.mod(r):s;if(f=e.s<0,r){if(r.c?!r.c[0]:!r.s)return new h(NaN);l=!f&&a.isInteger()&&r.isInteger(),l&&(a=a.mod(r))}else{if(e.e>9&&(a.e>0||a.e<-1||(a.e==0?a.c[0]>1||n&&a.c[1]>=24e7:a.c[0]<8e13||n&&a.c[0]<=9999975e7)))return o=a.s<0&&ue(e)?-0:0,a.e>-1&&(o=1/o),new h(f?1/o:o);re&&(o=R(re/O+2))}for(n?(t=new h(.5),f&&(e.s=1),u=ue(e)):(i=Math.abs(+b(e)),u=i%2),s=new h(P);;){if(u){if(s=s.times(a),!s.c)break;o?s.c.length>o&&(s.c.length=o):l&&(s=s.mod(r))}if(i){if(i=d(i/2),i===0)break;u=i%2}else if(e=e.times(t),V(e,e.e+1,1),e.e>14)u=ue(e);else{if(i=+b(e),i===0)break;u=i%2}a=a.times(a),o?a.c&&a.c.length>o&&(a.c.length=o):l&&(a=a.mod(r))}return l?s:(f&&(s=P.div(s)),r?s.mod(r):o?V(s,re,I,c):s)},p.integerValue=function(e){var r=new h(this);return e==null?e=I:S(e,0,8),V(r,r.e+1,e)},p.isEqualTo=p.eq=function(e,r){return te(this,new h(e,r))===0},p.isFinite=function(){return!!this.c},p.isGreaterThan=p.gt=function(e,r){return te(this,new h(e,r))>0},p.isGreaterThanOrEqualTo=p.gte=function(e,r){return(r=te(this,new h(e,r)))===1||r===0},p.isInteger=function(){return!!this.c&&X(this.e/O)>this.c.length-2},p.isLessThan=p.lt=function(e,r){return te(this,new h(e,r))<0},p.isLessThanOrEqualTo=p.lte=function(e,r){return(r=te(this,new h(e,r)))===-1||r===0},p.isNaN=function(){return!this.s},p.isNegative=function(){return this.s<0},p.isPositive=function(){return this.s>0},p.isZero=function(){return!!this.c&&this.c[0]==0},p.minus=function(e,r){var t,l,i,o,c=this,n=c.s;if(e=new h(e,r),r=e.s,!n||!r)return new h(NaN);if(n!=r)return e.s=-r,c.plus(e);var f=c.e/O,u=e.e/O,s=c.c,a=e.c;if(!f||!u){if(!s||!a)return s?(e.s=-r,e):new h(a?c:NaN);if(!s[0]||!a[0])return a[0]?(e.s=-r,e):new h(s[0]?c:I==3?-0:0)}if(f=X(f),u=X(u),s=s.slice(),n=f-u){for((o=n<0)?(n=-n,i=s):(u=f,i=a),i.reverse(),r=n;r--;i.push(0));i.reverse()}else for(l=(o=(n=s.length)<(r=a.length))?n:r,n=r=0;r<l;r++)if(s[r]!=a[r]){o=s[r]<a[r];break}if(o&&(i=s,s=a,a=i,e.s=-e.s),r=(l=a.length)-(t=s.length),r>0)for(;r--;s[t++]=0);for(r=D-1;l>n;){if(s[--l]<a[l]){for(t=l;t&&!s[--t];s[t]=r);--s[t],s[l]+=D}s[l]-=a[l]}for(;s[0]==0;s.splice(0,1),--u);return s[0]?we(e,s,u):(e.s=I==3?-1:1,e.c=[e.e=0],e)},p.modulo=p.mod=function(e,r){var t,l,i=this;return e=new h(e,r),!i.c||!e.s||e.c&&!e.c[0]?new h(NaN):!e.c||i.c&&!i.c[0]?new h(i):(se==9?(l=e.s,e.s=1,t=E(i,e,0,3),e.s=l,t.s*=l):t=E(i,e,0,se),e=i.minus(t.times(e)),!e.c[0]&&se==1&&(e.s=i.s),e)},p.multipliedBy=p.times=function(e,r){var t,l,i,o,c,n,f,u,s,a,g,w,A,M,C,x=this,m=x.c,G=(e=new h(e,r)).c;if(!m||!G||!m[0]||!G[0])return!x.s||!e.s||m&&!m[0]&&!G||G&&!G[0]&&!m?e.c=e.e=e.s=null:(e.s*=x.s,!m||!G?e.c=e.e=null:(e.c=[0],e.e=0)),e;for(l=X(x.e/O)+X(e.e/O),e.s*=x.s,f=m.length,a=G.length,f<a&&(A=m,m=G,G=A,i=f,f=a,a=i),i=f+a,A=[];i--;A.push(0));for(M=D,C=J,i=a;--i>=0;){for(t=0,g=G[i]%C,w=G[i]/C|0,c=f,o=i+c;o>i;)u=m[--c]%C,s=m[c]/C|0,n=w*u+s*g,u=g*u+n%C*C+A[o]+t,t=(u/M|0)+(n/C|0)+w*s,A[o--]=u%M;A[o]=t}return t?++l:A.splice(0,1),we(e,A,l)},p.negated=function(){var e=new h(this);return e.s=-e.s||null,e},p.plus=function(e,r){var t,l=this,i=l.s;if(e=new h(e,r),r=e.s,!i||!r)return new h(NaN);if(i!=r)return e.s=-r,l.minus(e);var o=l.e/O,c=e.e/O,n=l.c,f=e.c;if(!o||!c){if(!n||!f)return new h(i/0);if(!n[0]||!f[0])return f[0]?e:new h(n[0]?l:i*0)}if(o=X(o),c=X(c),n=n.slice(),i=o-c){for(i>0?(c=o,t=f):(i=-i,t=n),t.reverse();i--;t.push(0));t.reverse()}for(i=n.length,r=f.length,i-r<0&&(t=f,f=n,n=t,r=i),i=0;r;)i=(n[--r]=n[r]+f[r]+i)/D|0,n[r]=D===n[r]?0:n[r]%D;return i&&(n=[i].concat(n),++c),we(e,n,c)},p.precision=p.sd=function(e,r){var t,l,i,o=this;if(e!=null&&e!==!!e)return S(e,1,U),r==null?r=I:S(r,0,8),V(new h(o),e,r);if(!(t=o.c))return null;if(i=t.length-1,l=i*O+1,i=t[i]){for(;i%10==0;i/=10,l--);for(i=t[0];i>=10;i/=10,l++);}return e&&o.e+1>l&&(l=o.e+1),l},p.shiftedBy=function(e){return S(e,-ee,ee),this.times("1e"+e)},p.squareRoot=p.sqrt=function(){var e,r,t,l,i,o=this,c=o.c,n=o.s,f=o.e,u=v+4,s=new h("0.5");if(n!==1||!c||!c[0])return new h(!n||n<0&&(!c||c[0])?NaN:c?o:1/0);if(n=Math.sqrt(+b(o)),n==0||n==1/0?(r=W(c),(r.length+f)%2==0&&(r+="0"),n=Math.sqrt(+r),f=X((f+1)/2)-(f<0||f%2),n==1/0?r="5e"+f:(r=n.toExponential(),r=r.slice(0,r.indexOf("e")+1)+f),t=new h(r)):t=new h(n+""),t.c[0]){for(f=t.e,n=f+u,n<3&&(n=0);;)if(i=t,t=s.times(i.plus(E(o,i,u,1))),W(i.c).slice(0,n)===(r=W(t.c)).slice(0,n))if(t.e<f&&--n,r=r.slice(n-3,n+1),r=="9999"||!l&&r=="4999"){if(!l&&(V(i,i.e+v+2,0),i.times(i).eq(o))){t=i;break}u+=4,n+=4,l=1}else{(!+r||!+r.slice(1)&&r.charAt(0)=="5")&&(V(t,t.e+v+2,1),e=!t.times(t).eq(o));break}}return V(t,t.e+v+1,I,e)},p.toExponential=function(e,r){return e!=null&&(S(e,0,U),e++),ge(this,e,r,1)},p.toFixed=function(e,r){return e!=null&&(S(e,0,U),e=e+this.e+1),ge(this,e,r)},p.toFormat=function(e,r,t){var l,i=this;if(t==null)e!=null&&r&&typeof r=="object"?(t=r,r=null):e&&typeof e=="object"?(t=e,e=r=null):t=he;else if(typeof t!="object")throw Error(T+"Argument not an object: "+t);if(l=i.toFixed(e,r),i.c){var o,c=l.split("."),n=+t.groupSize,f=+t.secondaryGroupSize,u=t.groupSeparator||"",s=c[0],a=c[1],g=i.s<0,w=g?s.slice(1):s,A=w.length;if(f&&(o=n,n=f,f=o,A-=o),n>0&&A>0){for(o=A%n||n,s=w.substr(0,o);o<A;o+=n)s+=u+w.substr(o,n);f>0&&(s+=u+w.slice(o)),g&&(s="-"+s)}l=a?s+(t.decimalSeparator||"")+((f=+t.fractionGroupSize)?a.replace(new RegExp("\\d{"+f+"}\\B","g"),"$&"+(t.fractionGroupSeparator||"")):a):s}return(t.prefix||"")+l+(t.suffix||"")},p.toFraction=function(e){var r,t,l,i,o,c,n,f,u,s,a,g,w=this,A=w.c;if(e!=null&&(n=new h(e),!n.isInteger()&&(n.c||n.s!==1)||n.lt(P)))throw Error(T+"Argument "+(n.isInteger()?"out of range: ":"not an integer: ")+b(n));if(!A)return new h(w);for(r=new h(P),u=t=new h(P),l=f=new h(P),g=W(A),o=r.e=g.length-w.e-1,r.c[0]=oe[(c=o%O)<0?O+c:c],e=!e||n.comparedTo(r)>0?o>0?r:u:n,c=Z,Z=1/0,n=new h(g),f.c[0]=0;s=E(n,r,0,1),i=t.plus(s.times(l)),i.comparedTo(e)!=1;)t=l,l=i,u=f.plus(s.times(i=u)),f=i,r=n.minus(s.times(i=r)),n=i;return i=E(e.minus(t),l,0,1),f=f.plus(i.times(u)),t=t.plus(i.times(l)),f.s=u.s=w.s,o=o*2,a=E(u,l,o,I).minus(w).abs().comparedTo(E(f,t,o,I).minus(w).abs())<1?[u,l]:[f,t],Z=c,a},p.toNumber=function(){return+b(this)},p.toPrecision=function(e,r){return e!=null&&S(e,1,U),ge(this,e,r,2)},p.toString=function(e){var r,t=this,l=t.s,i=t.e;return i===null?l?(r="Infinity",l<0&&(r="-"+r)):r="NaN":(e==null?r=i<=$||i>=z?ce(W(t.c),i):K(W(t.c),i,"0"):e===10&&pe?(t=V(new h(t),v+i+1,I),r=K(W(t.c),t.e,"0")):(S(e,2,fe.length,"Base"),r=y(K(W(t.c),i,"0"),10,e,l,!0)),l<0&&t.c[0]&&(r="-"+r)),r},p.valueOf=p.toJSON=function(){return b(this)},p._isBigNumber=!0,p[Symbol.toStringTag]="BigNumber",p[Symbol.for("nodejs.util.inspect.custom")]=p.valueOf,N!=null&&h.set(N),h}function X(N){var E=N|0;return N>0||N===E?E:E-1}function W(N){for(var E,y,L=1,p=N.length,P=N[0]+"";L<p;){for(E=N[L++]+"",y=O-E.length;y--;E="0"+E);P+=E}for(p=P.length;P.charCodeAt(--p)===48;);return P.slice(0,p+1||1)}function te(N,E){var y,L,p=N.c,P=E.c,v=N.s,I=E.s,$=N.e,z=E.e;if(!v||!I)return null;if(y=p&&!p[0],L=P&&!P[0],y||L)return y?L?0:-I:v;if(v!=I)return v;if(y=v<0,L=$==z,!p||!P)return L?0:!p^y?1:-1;if(!L)return $>z^y?1:-1;for(I=($=p.length)<(z=P.length)?$:z,v=0;v<I;v++)if(p[v]!=P[v])return p[v]>P[v]^y?1:-1;return $==z?0:$>z^y?1:-1}function S(N,E,y,L){if(N<E||N>y||N!==d(N))throw Error(T+(L||"Argument")+(typeof N=="number"?N<E||N>y?" out of range: ":" not an integer: ":" not a primitive number: ")+String(N))}function ue(N){var E=N.c.length-1;return X(N.e/O)==E&&N.c[E]%2!=0}function ce(N,E){return(N.length>1?N.charAt(0)+"."+N.slice(1):N)+(E<0?"e":"e+")+E}function K(N,E,y){var L,p;if(E<0){for(p=y+".";++E;p+=y);N=p+N}else if(L=N.length,++E>L){for(p=y,E-=L;--E;p+=y);N+=p}else E<L&&(N=N.slice(0,E)+"."+N.slice(E));return N}var Ae=Ne();j.Z=Ae}}]);
