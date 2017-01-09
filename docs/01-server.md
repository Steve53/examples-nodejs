Start a local web server:

    node server.js
or

    nodejs server.js

In a browser

    http://localhost:8888

In another shell

    curl localhost:8888

Stop the local web server:

    CTRL-C

Node.js comes with a bunch of libraries (that is, source code modules).

The code in this example requires the
[**http**](https://nodejs.org/api/http.html)
 module that comes with Node.js.
For me this is in /usr/lib/nodejs/http.js.

We define an event handler named **onRequest**.
We pass the event handler to the
[**createServer**](https://nodejs.org/api/http.html#http_http_createserver_requestlistener)
function of the **http** module.
The **createServer** function returns a
[**Server**](https://nodejs.org/api/http.html#http_class_http_server)
object. The **Server** object is defined in /usr/lib/_http_server.js.

We call the
[**listen**](https://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback)
method of the **Server** object. This starts
a local web server listening on port 8888.

When the server calls our handler, it passes **request** and **response**.
The **request** argument is an
[**IncomingMessage**](https://nodejs.org/api/http.html#http_http_incomingmessage)
object. The **response** argument is a
[**ServerResponse**](https://nodejs.org/api/http.html#http_class_http_serverresponse)
object.


    h = require("http");

    function onRequest (request, response) {
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.write("Hello Steve");
      response.end();
    }

    srv = h.createServer(onRequest);
    srv.listen(8888);

Note: JavaScript supports annonymous functions. We can compress
the code like this:

	var http = require("http");
	http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello World");
	response.end();
	}).listen(8888);

See [The Node Beginner Book](http://www.nodebeginner.org/).

## ps

Find the process ID (PID) of the process started with the command **node**.

    ps -C node
    PID TTY          TIME CMD
    493 pts/1    00:00:00 node

List all processes.

    ps aux
    USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
    ....
    root       447  0.0  0.0      0     0 ?        S<   Oct21   0:00 [hd-audio0]
    steve      493  0.0  0.2 701788 22524 pts/1    Sl+  14:41   0:00 node server.js
    steve      498  0.0  0.0  27084  5696 pts/10   Ss   14:41   0:00 bash
    ....

Show the process tree.
  
    ps axjf
    ....
    1723 31665  1869  1869 ?           -1 Sl    1000   0:03          \_ gnome-terminal
    31665 31673  1869  1869 ?           -1 S     1000   0:00          |   \_ gnome-pty-helper
    31665 31674 31674 31674 pts/1      493 Ss    1000   0:00          |   \_ bash
    31674   493   493 31674 pts/1      493 Sl+   1000   0:00          |   |   \_ node server.js

## gdb

Attach the debugger (gdb) to process 493, which is the Node.js runtime.

	sudo gdb -p 493
	
	GNU gdb (Ubuntu 7.7.1-0ubuntu5~14.04.2) 7.7.1
	...
	Attaching to process 493
	Reading symbols from /usr/bin/nodejs...(no debugging symbols found)...done.
	...
	[Thread debugging using libthread_db enabled]
	...
	38	../sysdeps/unix/sysv/linux/x86_64/syscall.S: No such file or directory.
	Traceback (most recent call last):
	  File "/usr/share/gdb/auto-load/usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.19-gdb.py", line 63, in <module>
	    from libstdcxx.v6.printers import register_libstdcxx_printers
	ImportError: No module named 'libstdcxx'
	(gdb) 

Show the virtual address space of the process.

	(gdb) info proc mappings
	process 493
	Mapped address spaces:

		  Start Addr           End Addr       Size     Offset objfile
		    0x400000          0x11d2000   0xdd2000        0x0 /usr/bin/nodejs
		   0x13d1000          0x13d2000     0x1000   0xdd1000 /usr/bin/nodejs
		   0x13d2000          0x13eb000    0x19000   0xdd2000 /usr/bin/nodejs
		   0x13eb000          0x13f9000     0xe000        0x0 
		   0x30f6000          0x338a000   0x294000        0x0 [heap]
              ...
	      0x7fc3b7984000     0x7fc3b8184000   0x800000        0x0 [stack:497]
	      0x7fc3b8184000     0x7fc3b8185000     0x1000        0x0 
	      0x7fc3b8185000     0x7fc3b8985000   0x800000        0x0 [stack:496]
	      0x7fc3b8985000     0x7fc3b8986000     0x1000        0x0 
	      0x7fc3b8986000     0x7fc3b9186000   0x800000        0x0 [stack:495]
	      0x7fc3b9186000     0x7fc3b9187000     0x1000        0x0 
	      0x7fc3b9187000     0x7fc3b9987000   0x800000        0x0 [stack:494]
	      0x7fc3b9987000     0x7fc3b9b42000   0x1bb000        0x0 /lib/x86_64-linux-gnu/libc-2.19.so
	      0x7fc3b9b42000     0x7fc3b9d41000   0x1ff000   0x1bb000 /lib/x86_64-linux-gnu/libc-2.19.so
	      0x7fc3b9d41000     0x7fc3b9d45000     0x4000   0x1ba000 /lib/x86_64-linux-gnu/libc-2.19.so
	      0x7fc3b9d45000     0x7fc3b9d47000     0x2000   0x1be000 /lib/x86_64-linux-gnu/libc-2.19.so
	      0x7fc3b9d47000     0x7fc3b9d4c000     0x5000        0x0 
	      0x7fc3b9d4c000     0x7fc3b9d65000    0x19000        0x0 /lib/x86_64-linux-gnu/libpthread-2.19.so
	      0x7fc3b9d65000     0x7fc3b9f64000   0x1ff000    0x19000 /lib/x86_64-linux-gnu/libpthread-2.19.so
	      0x7fc3b9f64000     0x7fc3b9f65000     0x1000    0x18000 /lib/x86_64-linux-gnu/libpthread-2.19.so
	      0x7fc3b9f65000     0x7fc3b9f66000     0x1000    0x19000 /lib/x86_64-linux-gnu/libpthread-2.19.so
	      0x7fc3b9f66000     0x7fc3b9f6a000     0x4000        0x0 
	      0x7fc3b9f6a000     0x7fc3b9f80000    0x16000        0x0 /lib/x86_64-linux-gnu/libgcc_s.so.1
	      0x7fc3b9f80000     0x7fc3ba17f000   0x1ff000    0x16000 /lib/x86_64-linux-gnu/libgcc_s.so.1
	      0x7fc3ba17f000     0x7fc3ba180000     0x1000    0x15000 /lib/x86_64-linux-gnu/libgcc_s.so.1
	      0x7fc3ba180000     0x7fc3ba285000   0x105000        0x0 /lib/x86_64-linux-gnu/libm-2.19.so
	      0x7fc3ba285000     0x7fc3ba484000   0x1ff000   0x105000 /lib/x86_64-linux-gnu/libm-2.19.so
	      0x7fc3ba484000     0x7fc3ba485000     0x1000   0x104000 /lib/x86_64-linux-gnu/libm-2.19.so
	      0x7fc3ba485000     0x7fc3ba486000     0x1000   0x105000 /lib/x86_64-linux-gnu/libm-2.19.so
	      0x7fc3ba486000     0x7fc3ba56c000    0xe6000        0x0 /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.19
	      0x7fc3ba56c000     0x7fc3ba76b000   0x1ff000    0xe6000 /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.19
	      0x7fc3ba76b000     0x7fc3ba773000     0x8000    0xe5000 /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.19
	      0x7fc3ba773000     0x7fc3ba775000     0x2000    0xed000 /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.19
	      0x7fc3ba775000     0x7fc3ba78a000    0x15000        0x0 
	      0x7fc3ba78a000     0x7fc3ba791000     0x7000        0x0 /lib/x86_64-linux-gnu/librt-2.19.so
	      0x7fc3ba791000     0x7fc3ba990000   0x1ff000     0x7000 /lib/x86_64-linux-gnu/librt-2.19.so
	      0x7fc3ba990000     0x7fc3ba991000     0x1000     0x6000 /lib/x86_64-linux-gnu/librt-2.19.so
	      0x7fc3ba991000     0x7fc3ba992000     0x1000     0x7000 /lib/x86_64-linux-gnu/librt-2.19.so
	      0x7fc3ba992000     0x7fc3ba995000     0x3000        0x0 /lib/x86_64-linux-gnu/libdl-2.19.so
	      0x7fc3ba995000     0x7fc3bab94000   0x1ff000     0x3000 /lib/x86_64-linux-gnu/libdl-2.19.so
	      0x7fc3bab94000     0x7fc3bab95000     0x1000     0x2000 /lib/x86_64-linux-gnu/libdl-2.19.so
	      0x7fc3bab95000     0x7fc3bab96000     0x1000     0x3000 /lib/x86_64-linux-gnu/libdl-2.19.so
	      0x7fc3bab96000     0x7fc3babb9000    0x23000        0x0 /lib/x86_64-linux-gnu/ld-2.19.so
	      0x7fc3bad9b000     0x7fc3bada2000     0x7000        0x0 
	      0x7fc3badb6000     0x7fc3badb8000     0x2000        0x0 
	      0x7fc3badb8000     0x7fc3badb9000     0x1000    0x22000 /lib/x86_64-linux-gnu/ld-2.19.so
	      0x7fc3badb9000     0x7fc3badba000     0x1000    0x23000 /lib/x86_64-linux-gnu/ld-2.19.so
	      0x7fc3badba000     0x7fc3badbb000     0x1000        0x0 
	      0x7fff24a44000     0x7fff24a65000    0x21000        0x0 [stack]
	      0x7fff24b42000     0x7fff24b44000     0x2000        0x0 [vdso]
	      0x7fff24b44000     0x7fff24b46000     0x2000        0x0 [vvar]
	  0xffffffffff600000 0xffffffffff601000     0x1000        0x0 [vsyscall]

What's in the virtual address space of the nodejs process?

* nodejs executable
* libc-2.19.so
* libpthread-2.19.so
* libgcc_s.so.1
* libm-2.19.so
* libstdc++.so.6.0.19
* librt-2.19.so
* ld-2.19.so
* Heap space
* Stack space
* Portions of my app code (I think)
* Other


How big is the nodejs binary? About 14 MB.

	steve@steve-home-1:/usr/bin$ ls -l node*
	lrwxrwxrwx 1 root root       22 Oct 19 21:05 node -> /etc/alternatives/node
	-rwxr-xr-x 1 root root 14592120 Oct 19 12:12 nodejs

What about some of the shared libraries?

libc-2.19.so is about 1.8 MB. librt-2.19.so is about 31 KB.

Notice that the nodejs process has a huge virtual address space: about 128 TB.
But only small sections of the address space are actually used.
Also notice that the nodejs executable and the shared libraries are
mapped into the address space in sections.

What about threads? Is there only one thread?

	(gdb) info threads
	  Id   Target Id         Frame 
	  5    Thread 0x7fc3b9986700 (LWP 494) "V8 WorkerThread" sem_wait () at ../nptl/sysdeps/unix/sysv/linux/x86_64/sem_wait.S:85
	  4    Thread 0x7fc3b9185700 (LWP 495) "V8 WorkerThread" sem_wait () at ../nptl/sysdeps/unix/sysv/linux/x86_64/sem_wait.S:85
	  3    Thread 0x7fc3b8984700 (LWP 496) "V8 WorkerThread" sem_wait () at ../nptl/sysdeps/unix/sysv/linux/x86_64/sem_wait.S:85
	  2    Thread 0x7fc3b8183700 (LWP 497) "V8 WorkerThread" sem_wait () at ../nptl/sysdeps/unix/sysv/linux/x86_64/sem_wait.S:85
	* 1    Thread 0x7fc3bad9c780 (LWP 493) "node" syscall () at ../sysdeps/unix/sysv/linux/x86_64/syscall.S:38

I didn't expect to see a bunch of threads. I read somewhere that nodejs was single threaded.
Apparently ps doesn't show these as child processes.
Let's look at the call stacks for a few threads.

	(gdb) info stack
	#0  syscall () at ../sysdeps/unix/sysv/linux/x86_64/syscall.S:38
	#1  0x0000000000df1e3a in uv.epoll_wait ()
	#2  0x0000000000defcd4 in uv.io_poll ()
	#3  0x0000000000de0e86 in uv_run ()
	#4  0x0000000000d67ec0 in node::Start(int, char**) ()
	#5  0x00007fc3b99a8ec5 in __libc_start_main (main=0x6890a0 <main>, argc=2, argv=0x7fff24a622e8, init=<optimized out>, fini=<optimized out>, 
	    rtld_fini=<optimized out>, stack_end=0x7fff24a622d8) at libc-start.c:287
	#6  0x00000000006892cf in _start ()

	(gdb) thread 2
	[Switching to thread 2 (Thread 0x7fc3b8183700 (LWP 497))]
	#0  sem_wait () at ../nptl/sysdeps/unix/sysv/linux/x86_64/sem_wait.S:85
	85	../nptl/sysdeps/unix/sysv/linux/x86_64/sem_wait.S: No such file or directory.
	(gdb) info stack
	#0  sem_wait () at ../nptl/sysdeps/unix/sysv/linux/x86_64/sem_wait.S:85
	#1  0x0000000000df6898 in v8::base::Semaphore::Wait() ()
	#2  0x0000000000dcd8a9 in v8::platform::TaskQueue::GetNext() ()
	#3  0x0000000000dcd9fc in v8::platform::WorkerThread::Run() ()
	#4  0x0000000000df7870 in ?? ()
	#5  0x00007fc3b9d54182 in start_thread (arg=0x7fc3b8183700) at pthread_create.c:312
	#6  0x00007fc3b9a8147d in clone () at ../sysdeps/unix/sysv/linux/x86_64/clone.S:111

	(gdb) thread 3
	[Switching to thread 3 (Thread 0x7fc3b8984700 (LWP 496))]
	#0  sem_wait () at ../nptl/sysdeps/unix/sysv/linux/x86_64/sem_wait.S:85
	85	in ../nptl/sysdeps/unix/sysv/linux/x86_64/sem_wait.S
	(gdb) info stack
	#0  sem_wait () at ../nptl/sysdeps/unix/sysv/linux/x86_64/sem_wait.S:85
	#1  0x0000000000df6898 in v8::base::Semaphore::Wait() ()
	#2  0x0000000000dcd8a9 in v8::platform::TaskQueue::GetNext() ()
	#3  0x0000000000dcd9fc in v8::platform::WorkerThread::Run() ()
	#4  0x0000000000df7870 in ?? ()
	#5  0x00007fc3b9d54182 in start_thread (arg=0x7fc3b8984700) at pthread_create.c:312
	#6  0x00007fc3b9a8147d in clone () at ../sysdeps/unix/sysv/linux/x86_64/clone.S:111

## Symbols

Recall that when we attached the debugger to nodejs, we got this:

    Attaching to process 493
	Reading symbols from /usr/bin/nodejs...(no debugging symbols found)...done.

Find a file that has symbols for nodejs.

	apt-file find /usr/bin/nodejs
	nodejs: /usr/bin/nodejs
	nodejs-dbg: /usr/lib/debug/usr/bin/nodejs

	sudo apt-get install nodejs-dbg

Attach the debugger.

	ps -C node
	PID TTY          TIME CMD
	7509 pts/1    00:00:00 node

	sudo gdb -p 7509
	…
	Attaching to process 7509
	Reading symbols from /usr/bin/nodejs...Reading symbols from /usr/lib/debug//usr/bin/nodejs...done.

The debugger found symbols in /usr/lib/debug/usr/bin/nodejs.

	file /usr/lib/debug/usr/bin/nodejs
	/usr/lib/debug/usr/bin/nodejs: ELF 64-bit LSB  executable, x86-64, version 1 (SYSV),
	dynamically linked (uses shared libs), for GNU/Linux 2.6.24, BuildID[sha1]=1b2ec93b51629fc6eda4ab241e4d0b84d6f69423,
	not stripped

	objdump --section-headers /usr/lib/debug/usr/bin/nodejs
	…
	 26 .debug_aranges 00002310  0000000000000000  0000000000000000  000002e5  2**0
		          CONTENTS, READONLY, DEBUGGING
	 27 .debug_info   0004f906  0000000000000000  0000000000000000  000025f5  2**0
		          CONTENTS, READONLY, DEBUGGING





