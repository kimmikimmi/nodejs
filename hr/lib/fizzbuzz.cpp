#include <istream>
using namespace std;


int main(int argc, char const *argv[])
{
	for(int i=0; i<100; i++) {
		if(i%3 == 0 && i%5 == 0) cout << "FIZZ BUZZ" << endl;

		if(i%5 == 0) cout << "BUZZ" << endl;

		if(i%3 == 0) cout << "FIZZ" << endl;
	}
	return 0;
}