#include <iostream>
#include <string>
#include <vector>
#include <array>
#include <algorithm>
#include <cctype>
using namespace std;
// Independent reconstruction from inspected native control flow.
static const string widths="212222222122222221121223121322131222122213122312132212221213221312231212112232122132122231113222123122123221223211221132221231213212223112312131311222321122321221312212322112322211212123212321232121111323131123131321112313132113132311211313231113231311112133112331132131113123113321133121313121211331231131213113213311213131311123311321331121312113312311332111314111221411431111111224111422121124121421141122141221112214112412122114122411142112142211241211221114413111241112134111111242121142121241114212124112124211411212421112421211212141214121412121111143111341131141114113114311411113411311113141114131311141411131211412211214211232211133";
bool digit(char c){return c>='0'&&c<='9';}
// Return length bounds; semantic validation only issues warnings in this CLI.
pair<int,int> bounds(int a){
 if(a==0)return {18,18}; if(a>=1&&a<=3)return {14,14};
 if(a==10||a==21||a==22)return {1,20};
 if(a==11||a==12||a==13||a==15||a==16||a==17)return {6,6};
 if(a==20)return {2,2};if(a==30||a==37)return {1,8};
 if(a==90)return {1,30};if(a>=91&&a<=99)return {1,90};
 if(a==235)return {1,28};if(a==240||a==241||a==250||a==251)return {1,30};
 if(a==242)return {1,6};if(a==243||a==254)return {1,20};
 if(a==253)return {13,30};if(a==255)return {13,25};
 if(a==400||a==401||a==403)return {1,30};if(a==402)return {17,17};
 if(a>=410&&a<=417)return {13,13};if(a==420)return {1,20};if(a==421)return {4,12};
 if(a==422||a==424||a==426)return {3,3};if(a==423||a==425)return {3,15};if(a==427)return {1,3};
 if(a>=710&&a<=717)return {1,20};
 if(a>=3100&&a<3700){int p=a/10,d=a%10;bool ok=(p>=310&&p<=316)||(p>=320&&p<=337)||(p>=340&&p<=357)||(p>=360&&p<=369);if(ok&&d<=5)return {6,6};return {0,0};}
 if((a>=3900&&a<=3909)||(a>=3920&&a<=3929))return {1,15};
 if((a>=3910&&a<=3919)||(a>=3930&&a<=3939))return {4,18};
 if(a>=3940&&a<=3943)return {4,4};if(a>=3950&&a<=3955)return {6,6};
 if(a==4300||a==4301||a==4310||a==4311||a==4320)return {1,35};
 if((a>=4302&&a<=4306)||(a>=4312&&a<=4316)||a==7241)return {1,70};
 if(a==4307||a==4317)return {2,2};if(a==4308||a==4319||a==7002)return {1,30};
 if(a==4309)return {20,20};if(a==4318)return {1,20};if(a>=4321&&a<=4323)return {1,1};
 if(a==4324||a==4325)return {10,10};if(a==4326||a==7006)return {6,6};if(a>=4330&&a<=4333)return {6,7};
 if(a==7001)return {13,13};if(a==7003)return {10,10};if(a==7004)return {1,4};if(a==7005)return {1,12};
 if(a==7007)return {6,12};if(a==7008)return {1,3};if(a==7009)return {1,10};if(a==7010)return {1,2};if(a==7011)return {6,10};
 if(a>=7020&&a<=7022)return {1,20};if(a==7023)return {1,30};if(a>=7030&&a<=7039)return {4,30};if(a==7040)return {4,4};if(a==7041)return {1,4};
 if(a>=7230&&a<=7239)return {3,30};if(a==7240)return {1,20};if(a==7242)return {1,25};
 if(a==7250)return {8,8};if(a==7251)return {12,12};if(a==7252)return {1,1};if(a==7253||a==7254||a==7259)return {1,40};
 if(a==7255)return {1,10};if(a==7256)return {1,90};if(a==7257)return {1,70};if(a==7258)return {3,3};
 if(a==8001)return {14,14};if(a==8002)return {1,20};if(a==8003)return {14,30};if(a==8004)return {1,30};if(a==8005)return {6,6};
 if(a==8006||a==8026)return {18,18};if(a==8007)return {1,34};if(a==8008)return {8,12};if(a==8009)return {1,50};
 if(a==8010)return {1,30};if(a==8011)return {1,12};if(a==8012)return {1,20};if(a==8013)return {1,25};if(a==8014)return {1,25};
 if(a==8017||a==8018)return {18,18};if(a==8019)return {1,10};if(a==8020)return {1,25};if(a==8030)return {1,90};
 if(a==8040||a==8041)return {15,15};if(a==8042)return {32,32};if(a==8043)return {18,20};
 if(a==8110||a==8112)return {1,70};if(a==8111)return {4,4};if(a==8200)return {1,70};return {0,0};
}
int hexval(char c){if(digit(c))return c-'0';c=tolower((unsigned char)c);return c>='a'&&c<='f'?c-'a'+10:-1;}
int unescape(const string&s,string&o,bool par){
 for(size_t i=0;i<s.size();i++){char c=s[i];if(c!='\\'){o+=c;continue;}if(++i==s.size())return 6;c=s[i];
 string keys="0abtnvfreG";string vals;vals.push_back(0);vals+=char(7);vals+=char(8);vals+=char(9);vals+=char(10);vals+=char(11);vals+=char(12);vals+=char(13);vals+=char(27);vals+=char(29);
 auto k=keys.find(c);if(k!=string::npos){o+=vals[k];continue;}if(c=='\\'){o+=c;continue;}
 if(c=='('||c==')'){if(!par)return 6;o+='\\';o+=c;continue;}
 if(c=='x'||c=='d'||c=='o'){int n=c=='x'?2:3,base=c=='x'?16:c=='d'?10:8,v=0;if(i+n>=s.size())return 6;for(int j=0;j<n;j++){int h=hexval(s[++i]);if(h<0||h>=base)return 6;v=v*base+h;}if(v>255)return 6;o+=char(v);continue;}
 if(c=='u'||c=='U'){int n=c=='u'?4:6,v=0;if(i+n>=s.size())return 6;for(int j=0;j<n;j++){int h=hexval(s[++i]);if(h<0)return 6;v=v*16+h;}if(v<128)o+=char(v);else return 6;continue;}return 6;}return 0;
}
struct Field{string ai,data;int a;};
int normalize(string s,bool par,string&out){
 for(unsigned char c:s)if(c<32||c>=127)return 6;
 if(par){string t;for(size_t i=0;i<s.size();i++){if(s[i]=='\\'&&i+1<s.size()&&(s[i+1]=='('||s[i+1]==')')){t+=char(s[++i]&0xdf);}else t+=s[i];}s=t;}
 char op=par?'(':'[',cl=par?')':']';if(s.empty()||s[0]!=op)return 6;vector<Field> f;
 size_t i=0;while(i<s.size()){if(s[i]!=op)return 6;size_t e=s.find(cl,i+1);if(e==string::npos)return 6;string ai=s.substr(i+1,e-i-1);if(ai.size()<2||ai.size()>4||!all_of(ai.begin(),ai.end(),digit))return 6;size_t q=s.find(op,e+1);if(q==string::npos)q=s.size();string d=s.substr(e+1,q-e-1);if(d.empty())return 6;int a=stoi(ai);auto b=bounds(a);if(!b.second||d.size()<(size_t)b.first||d.size()>(size_t)b.second)return 6;f.push_back({ai,d,a});i=q;}
 for(size_t j=0;j<f.size();j++){out+=f[j].ai;for(char c:f[j].data)out+=char((unsigned char)c<29?c|32:c);int p=stoi(f[j].ai.substr(0,2));bool fixed=p<=41&&((0x21f809ff81fULL>>p)&1);if(j+1<f.size()&&!fixed)out+=char(29);}return 0;
}
vector<int> encode(const string&s){int n=s.size();vector<array<int,3>> cost(n+2),choice(n+2);for(int i=n-1;i>=0;i--)for(int prev=0;prev<3;prev++){int best=100000,b=0;for(int set:{2,1}){bool fn=s[i]==29;bool pair=i+1<n&&digit(s[i])&&digit(s[i+1]);if(set==2&&!fn&&!pair)continue;int take=set==2&&!fn?2:1;int v=1+(prev==0?2:prev!=set)+cost[i+take][set];if(v<best){best=v;b=set;}}cost[i][prev]=best;choice[i][prev]=b;}
 vector<int> w;int p=0;for(int i=0;i<n;){int b=choice[i][p];if(p==0){w.push_back(b==2?105:104);w.push_back(102);}else if(p!=b)w.push_back(b==2?99:100);if(s[i]==29){w.push_back(102);i++;}else if(b==2){w.push_back((s[i]-'0')*10+s[i+1]-'0');i+=2;}else w.push_back((unsigned char)s[i++]-32);p=b;}return w;}
void dump(vector<int>w){int sum=w[0];for(size_t i=1;i<w.size();i++)sum+=i*w[i];w.push_back(sum%103);string runs;for(int c:w)runs+=widths.substr(c*6,6);runs+="2331112";string bits;bool black=true;for(char c:runs){bits.append(c-'0',black?'1':'0');black=!black;}const char*h="0123456789ABCDEF";for(size_t i=0;i<bits.size();i+=4){int v=0;for(int j=0;j<4;j++)v=v*2+(i+j<bits.size()&&bits[i+j]=='1');cout<<h[v];if(i%8==4&&i+4<bits.size())cout<<' ';}cout<<'\n';}
int main(int argc,char**argv){string s;bool par=false,esc=false,got=false;for(int i=1;i<argc;i++){string a=argv[i];if(a=="-d"||a=="--data"){if(i+1<argc){s=argv[++i];got=true;}}else if(a.rfind("--data=",0)==0){s=a.substr(7);got=true;}else if(a=="--gs1parens")par=true;else if(a=="--esc")esc=true;else if(a=="-b"&&i+1<argc)i++;}if(!got||s.empty())return 6;if(esc){string t;int e=unescape(s,t,par);if(e)return e;s=t;}if(s.size()>256)return 5;string r;int e=normalize(s,par,r);if(e)return e;auto w=encode(r);if(w.size()>102)return 5;if(w.empty())return 6;dump(w);return 0;}
