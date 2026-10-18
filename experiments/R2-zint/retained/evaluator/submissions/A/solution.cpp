#include <iostream>
#include <string>
#include <vector>
#include <map>
#include <array>
#include <functional>
#include <cctype>
using namespace std;
// Independent bounded reconstruction. No runtime dependency on inspected artifacts.
static const char *pat[]={
"212222","222122","222221","121223","121322","131222","122213","122312","132212","221213","221312","231212","112232","122132","122231","113222","123122","123221","223211","221132","221231","213212","223112","312131","311222","321122","321221","312212","322112","322211","212123","212321","232121","111323","131123","131321","112313","132113","132311","211313","231113","231311","112133","112331","132131","113123","113321","133121","313121","211331","231131","213113","213311","213131","311123","311321","331121","312113","312311","332111","314111","221411","431111","111224","111422","121124","121421","141122","141221","112214","112412","122114","122411","142112","142211","241211","221114","413111","241112","134111","111242","121142","121241","114212","124112","124211","411212","421112","421211","212141","214121","412121","111143","111341","131141","114113","114311","411113","411311","113141","114131","311141","411131","211412","211214","211232","2331112"};
struct Rule {int lo,hi;};
Rule rule(const string &s){
 int a=stoi(s);
 if(s.size()==2){
  if(a==0)return {18,18}; if(a>=1&&a<=3)return {14,14};
  if(a==10||a==21||a==22)return {1,20};
  if(a==11||a==12||a==13||a==15||a==16||a==17)return {6,6};
  if(a==20)return {2,2}; if(a==30||a==37)return {1,8};
  if(a==90)return {1,30}; if(a>=91&&a<=99)return {1,90};
 }
 if(s.size()==3){
  if(a==235)return {1,28}; if(a==240||a==241||a==250||a==251)return {1,30};
  if(a==242)return {1,6}; if(a==243||a==254)return {1,20};
  if(a==253)return {13,30}; if(a==255)return {13,25};
  if(a==400||a==401||a==403)return {1,30}; if(a==402)return {17,17};
  if(a>=410&&a<=417)return {13,13};
  if(a==420)return {1,20};if(a==421)return {4,12};
  if(a==422||a==424||a==426)return {3,3}; if(a==423||a==425)return {3,15};
  if(a==427)return {1,3}; if(a>=710&&a<=717)return {1,20};
 }
 if(s.size()==4){
  int p=a/10,d=a%10;
  if(d<=5&&((p>=310&&p<=316)||(p>=320&&p<=337)||(p>=340&&p<=357)||(p>=360&&p<=369)))return {6,6};
  if(p==390||p==392)return {1,15}; if(p==391||p==393)return {4,18};
  if(p==394&&d<=3)return {4,4};if(p==395&&d<=5)return {6,6};
  if(a==4300||a==4301||a==4310||a==4311||a==4320)return {1,35};
  if((a>=4302&&a<=4306)||(a>=4312&&a<=4316))return {1,70};
  if(a==4307||a==4317)return {2,2};if(a==4308||a==4319)return {1,30};
  if(a==4309)return {20,20};if(a==4318)return {1,20};
  if(a>=4321&&a<=4323)return {1,1};if(a==4324||a==4325)return {10,10};if(a==4326)return {6,6};
  if(a==4330||a==4331||a==4332||a==4333)return {6,7};
  if(a==7001)return {13,13};if(a==7002)return {1,30};if(a==7003)return {10,10};if(a==7004)return {1,4};
  if(a==7005)return {1,12};if(a==7006)return {6,6};if(a==7007)return {6,12};if(a==7008)return {1,3};if(a==7009)return {1,10};if(a==7010)return {1,2};if(a==7011)return {6,10};
  if(a>=7020&&a<=7022)return {1,20};if(a==7023)return {1,30};if(p==703)return {4,30};if(a==7040)return {4,4};if(a==7041)return {1,4};
  if(a>=7230&&a<=7239)return {3,30};if(a==7240)return {1,20};if(a==7241)return {2,2};if(a==7242)return {1,25};
  if(a==8001)return {14,14};if(a==8002)return {1,20};if(a==8003)return {14,30};if(a==8004)return {1,30};if(a==8005)return {6,6};if(a==8006||a==8026)return {18,18};if(a==8007)return {1,34};if(a==8008)return {8,12};if(a==8009)return {1,50};
  if(a==8010)return {1,30};if(a==8011)return {1,12};if(a==8012)return {1,20};if(a==8013||a==8014)return {1,25};if(a==8017||a==8018)return {18,18};if(a==8019)return {1,10};if(a==8020)return {1,25};if(a==8030)return {1,90};
  if(a==8110||a==8112)return {1,70};if(a==8111)return {4,4};if(a==8200)return {1,70};
 }
 return {-1,-1};
}
int main(int argc,char**argv){
 string src;bool par=false,esc=false;for(int i=1;i<argc;i++){string a=argv[i];if((a=="-d"||a=="--data")&&i+1<argc)src=argv[++i];else if(a=="--gs1parens")par=true;else if(a=="--esc")esc=true;}
 auto fail=[](int c){cerr<<"Invalid input\n";return c;};
 if(src.empty())return fail(6);string t;
 for(size_t i=0;i<src.size();i++){unsigned char c=src[i];if(esc&&c=='\\'){if(++i>=src.size())return fail(6);c=src[i];string keys="0EabtnvfreG R\\";
 if(c=='('||c==')'){if(!par)return fail(6);t+=char(c=='('?1:2);continue;}
 if(c=='x'||c=='d'||c=='o'||c=='u'||c=='U'){int n=c=='x'?2:c=='u'?4:c=='U'?6:3,base=c=='d'?10:c=='o'?8:16;unsigned v=0;if(i+n>=src.size())return fail(6);for(int j=0;j<n;j++){char z=src[++i];int d=z>='0'&&z<='9'?z-'0':z>='a'&&z<='f'?z-'a'+10:z>='A'&&z<='F'?z-'A'+10:99;if(d>=base)return fail(6);v=v*base+d;}if(v>127)return fail(6);c=v;}
 else {switch(c){case '0':c=0;break;case 'E':c=4;break;case 'a':c=7;break;case 'b':c=8;break;case 't':c=9;break;case 'n':c=10;break;case 'v':c=11;break;case 'f':c=12;break;case 'r':c=13;break;case 'e':c=27;break;case 'G':c=29;break;case 'R':c=30;break;case '\\':break;default:return fail(6);}}}
 if(c<32||c>=127)return fail(6);t+=char(c);}
 if(t.size()>256)return fail(5);
 char op=par?'(':'[',cl=par?')':']';vector<pair<string,string>> fields;
 size_t pos=0;while(pos<t.size()){if(t[pos]!=op)return fail(6);size_t end=t.find(cl,pos+1);if(end==string::npos)return fail(6);string ai=t.substr(pos+1,end-pos-1);if(ai.size()<2||ai.size()>4)return fail(6);for(char c:ai)if(!isdigit((unsigned char)c))return fail(6);size_t next=t.find(op,end+1);if(next==string::npos)next=t.size();string val=t.substr(end+1,next-end-1);if(val.find(cl)!=string::npos||val.empty())return fail(6);Rule r=rule(ai);if(r.lo<0||val.size()<(size_t)r.lo||val.size()>(size_t)r.hi)return fail(6);for(char &c:val){if(c==1)c='(';if(c==2)c=')';}fields.push_back({ai,val});pos=next;}
 string data;for(size_t i=0;i<fields.size();i++){auto &f=fields[i];data+=f.first;data+=f.second;int a=stoi(f.first.substr(0,2));bool fixed=a<=41&&((0x21f809ff81fULL>>a)&1);if(i+1<fields.size()&&!fixed)data+=char(29);}
 int n=data.size();vector<array<int,3>> dp(n+1),choice(n+1); // 0 initial, 1 B, 2 C
 for(int i=n-1;i>=0;i--)for(int state=0;state<3;state++){int best=100000,win=1;for(int set:{2,1}){int step=1;if(set==2&&data[i]!=29){if(i+1>=n||!isdigit((unsigned char)data[i])||!isdigit((unsigned char)data[i+1]))continue;step=2;}int cost=(state==0?2:state!=set?1:0)+1+dp[i+step][set];if(cost<best){best=cost;win=set;}}dp[i][state]=best;choice[i][state]=win;}
 vector<int> codes;int state=0;for(int i=0;i<n;){int set=choice[i][state];if(!state){codes.push_back(set==2?105:104);codes.push_back(102);}else if(set!=state)codes.push_back(set==2?99:100);state=set;if(data[i]==29){codes.push_back(102);i++;}else if(set==2){codes.push_back((data[i]-'0')*10+data[i+1]-'0');i+=2;}else codes.push_back((unsigned char)data[i++]-32);}
 if(codes.size()>102)return fail(5);int sum=codes[0];for(size_t i=1;i<codes.size();i++)sum+=int(i)*codes[i];codes.push_back(sum%103);codes.push_back(106);string bits;for(int x:codes){bool bar=true;for(const char*p=pat[x];*p;p++){bits.append(*p-'0',bar?'1':'0');bar=!bar;}}
 const char*hex="0123456789ABCDEF";for(size_t i=0;i<bits.size();i+=4){if(i&&i%8==0)cout<<' ';int v=0;for(int j=0;j<4;j++)v=v*2+(i+j<bits.size()&&bits[i+j]=='1');cout<<hex[v];}cout<<'\n';return 0;
}
