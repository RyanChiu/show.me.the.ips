# show.me.the.ips

<h2>bash script part</h2>

**bash script that should be put into one of your machines inside the local subnet which needs to recorgnize the outbound ip.**<br/>
**say, we named the script "sendipout.sh" and make it runnable:**<br/>
<i>please notice, that, you should replace "yourusername/yourmachinename/yourvmusername/yourvmipaddr" to your own ones. and, of course, set your ssh to yourvm (virtual machine) authorised in order to use scp without password.</i>
<pre>
curIP=$(curl ifconfig.cc)
loIP=$(cat /home/yourusername/.obip);
echo "current IP: $curIP, local saved IP: $loIP."
if [ "$curIP" = "$loIP" ]; then
        echo "it's a match."
else
        echo $curIP > /home/yourusername/.obip
        scp /home/yourusername/.obip yourvmusername@yourvmipaddr:/home/yourvmusername/.yourmachinename.obip;
fi
</pre>

**then, you need to create a crontab job like the following line (say every 30 minutes):**
<pre>
# m h  dom mon dow   command
0,30 * * * * /home/ray/sendipout.sh
</pre>

<h2>node.js server part<h2>
        
**first of all, node.js and other related stuff need to be installed on your vm (say our vm is "debian based" linux server kind of stuff).**<br/>
<pre>
apt install nodejs npm;
npm install express pug node-watch
</pre>

**then, please git clone this repository into your vm, and run it, it should be listening on port 21180.**<br/>
<pre>
cd /the/directory/that/you/just/cloned/it/into/;
node app.js
</pre>
<i>and please notice, again, that, you should change some codes in app.js, such as putting the reall path, like "/home/yourvmusername/.yourmachinename.obip", into array fn, if you know what i mean.</i>
