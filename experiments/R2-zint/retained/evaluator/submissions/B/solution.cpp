#include <iostream>
#include <string>
#include <vector>
#include <map>
#include <array>
#include <functional>
#include <algorithm>
using namespace std;
static const string widths="212222222122222221121223121322131222122213122312132212221213221312231212112232122132122231113222123122123221223211221132221231213212223112312131311222321122321221312212322112322211212123212321232121111323131123131321112313132113132311211313231113231311112133112331132131113123113321133121313121211331231131213113213311213131311123311321331121312113312311332111314111221411431111111224111422121124121421141122141221112214112412122114122411142112142211241211221114413111241112134111111242121142121241114212124112124211411212421112421211212141214121412121111143111341131141114113114311411113411311113141114131311141411131211412211214211232211133";
// Length rules recovered from FUN_001a0280; specialized families below are bounded approximations.
pair<int,int> rule(int a){
 if(a==0)return {18,18}; if(a>=1&&a<=3)return {14,14};
 if(a==10||a==21||a==22)return {1,20};
 if(a==11||a==12||a==13||a==15||a==16||a==17)return {6,6};
 if(a==20)return {2,2}; if(a==30||a==37)return {1,8};
 if(a==90)return {1,30}; if(a>=91&&a<=99)return {1,90};
 if(a==235)return {1,28}; if(a==240||a==241||a==250||a==251)return {1,30};
 if(a==242)return {1,6}; if(a==243||a==254)return {1,20};
 if(a==253)return {13,30}; if(a==255)return {13,25};
 if(a==400||a==401||a==403)return {1,30}; if(a==402)return {17,17};
 if(a>=410&&a<=417)return {13,13}; if(a==420)return {1,20}; if(a==421)return {4,12};
 if(a==422||a==424||a==426)return {3,3}; if(a==423||a==425)return {3,15}; if(a==427)return {1,3};
 if(a>=710&&a<=717)return {1,20};
 if(a>=3100&&a<=3695&&a%10<=5)return {6,6};
 if(a>=3900&&a<=3939)return {(a/10)%2?4:1,(a/10)%2?18:15};
 if(a>=3940&&a<=3943)return {4,4}; if(a>=3950&&a<=3955)return {6,6};
 if(a==4300||a==4301||a==4310||a==4311||a==4320)return {1,35};
 if((a>=4302&&a<=4306)||(a>=4312&&a<=4316)||a==4321)return {1,70};
 if(a==4307||a==4317)return {2,2}; if(a==4309)return {20,20};
 if(a>=4321&&a<=4323)return {1,1}; if(a==4326||a==7006)return {6,6};
 if(a==7001)return {13,13}; if(a==7002)return {1,30}; if(a==7004)return {1,4};
 if(a==7005)return {1,12}; if(a==7008)return {1,3}; if(a==7010)return {1,2};
 if(a>=7020&&a<=7022)return {1,20};
 if(a==8001)return {14,14}; if(a==8002)return {1,20}; if(a==8003)return {14,30};
 if(a==8004)return {1,30}; if(a==8005)return {6,6}; if(a==8006||a==8026)return {18,18};
 if(a==8007)return {1,34}; if(a==8008)return {8,12}; if(a==8009)return {1,50};
 if(a==8010)return {1,30}; if(a==8011)return {1,12}; if(a==8012)return {1,20};
 if(a==8013)return {1,25}; if(a==8017||a==8018)return {18,18}; if(a==8019)return {1,10};
 if(a==8020)return {1,25}; if(a==8040||a==8041)return {15,15}; if(a==8042)return {32,32};
 if(a==8111)return {4,4}; if(a==8200)return {1,70}; return {-1,-1};
}
bool digit(char c){return c>='0'&&c<='9';}
int main(int argc,char**argv){
 string s; bool par=false,esc=false,found=false;
 for(int i=1;i<argc;i++){string a=argv[i];if(a=="-d"&&i+1<argc){s=argv[++i];found=true;}else if(a=="--gs1parens")par=true;else if(a=="--esc")esc=true;}
 if(!found||s.empty())return 6;
 if(esc){string t;for(size_t i=0;i<s.size();i++){if(s[i]!='\\'){t+=s[i];continue;}if(++i==s.size())return 6;char c=s[i];string names="0abtnvfreG\\", vals;vals.push_back(0);vals+="\a\b\t\n\v\f\r";vals.push_back(27);vals.push_back(29);vals.push_back('\\');size_t k=names.find(c);if(k!=string::npos){t+=vals[k];continue;}if(c=='('||c==')'){if(!par)return 6;t+='\\';t+=c;continue;}int n=c=='x'?2:(c=='d'||c=='o'?3:(c=='u'?4:(c=='U'?6:0)));if(!n||i+n>=s.size())return 6;int v=0,base=c=='d'?10:c=='o'?8:16;for(int j=0;j<n;j++){char h=s[++i];int z=digit(h)?h-'0':h>='a'&&h<='f'?h-'a'+10:h>='A'&&h<='F'?h-'A'+10:99;if(z>=base)return 6;v=v*base+z;}if(v>255)return 6;t+=char(v);}s=t;}
 if(s.size()>256)return 5;
 for(unsigned char c:s)if(c<32||c>=127)return 6;
 // Parenthesis literals use temporary sentinels, as the native parser does.
 if(par){string t;for(size_t i=0;i<s.size();i++){if(s[i]=='\\'&&i+1<s.size()&&(s[i+1]=='('||s[i+1]==')')){t+=char(s[++i]&31);}else t+=s[i];}s=t;}
 char op=par?'(':'[',cl=par?')':']';string reduced;
 struct Field{string ai,data;};vector<Field> fields;size_t p=0;
 while(p<s.size()){if(s[p]!=op)return 6;size_t e=s.find(cl,p+1);if(e==string::npos)return 6;string ai=s.substr(p+1,e-p-1);if(ai.size()<2||ai.size()>4||!all_of(ai.begin(),ai.end(),digit))return 6;size_t q=s.find(op,e+1);if(q==string::npos)q=s.size();string d=s.substr(e+1,q-e-1);auto r=rule(stoi(ai));if(r.first<0||int(d.size())<r.first||int(d.size())>r.second)return 6;fields.push_back({ai,d});p=q;}
 for(size_t j=0;j<fields.size();j++){auto &f=fields[j];reduced+=f.ai;for(unsigned char c:f.data)reduced+=char(c<29?c|32:c);int prefix=stoi(f.ai.substr(0,2));bool fixed=prefix<=41&&((0x21f809ff81fULL>>prefix)&1);if(!fixed&&j+1<fields.size())reduced+=char(29);}
 if(reduced.empty())return 6;
 int n=reduced.size();vector<array<int,3>> memo(n+1),choice(n);for(auto &a:memo)a.fill(-1);memo[n].fill(0);
 // States 0=start, 1=B, 2=C. Native permitted-set order is C, B.
 function<int(int,int)> cost=& (retained source reference: `int i,int prev`){if(i==n)return 0;int &v=memo[i][prev];if(v>=0)return v;v=100000;for(int st:{2,1}){bool fn=reduced[i]==29;int step=st==2&&!fn?2:1;if(st==2&&!fn&&(i+1>=n||!digit(reduced[i])||!digit(reduced[i+1])))continue;int z=1+(prev==0?2:prev!=st?1:0)+cost(i+step,st);if(z<v){v=z;choice[i][prev]=st;}}return v;};
 cost(0,0);vector<int> cw;int i=0,prev=0;while(i<n){int st=choice[i][prev];if(!prev){cw.push_back(st==2?105:104);cw.push_back(102);}else if(st!=prev)cw.push_back(st==2?99:100);if(reduced[i]==29){cw.push_back(102);i++;}else if(st==2){cw.push_back((reduced[i]-'0')*10+reduced[i+1]-'0');i+=2;}else cw.push_back((unsigned char)reduced[i++]-32);prev=st;}
 if(cw.size()>102)return 5;int sum=cw[0];for(size_t j=1;j<cw.size();j++)sum+=int(j)*cw[j];cw.push_back(sum%103);string bars;for(int c:cw){if(c<0||c>105)return 6;bars+=widths.substr(c*6,6);}bars+="2331112";string bits;bool black=true;for(char c:bars){bits.append(c-'0',black?'1':'0');black=!black;}
 const char*hex="0123456789ABCDEF";for(size_t j=0;j<bits.size();j+=4){if(j&&j%8==0)cout<<' ';int v=0;for(int k=0;k<4;k++)v=v*2+(j+k<bits.size()&&bits[j+k]=='1');cout<<hex[v];}cout<<'\n';return 0;
}
