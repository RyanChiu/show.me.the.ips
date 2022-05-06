# show.me.the.ips

**bash script that should be put into your machine inside the local subnet**
**say, we named the script "sendipout.sh" and make it runnable**
`
curIP=$(curl ifconfig.cc)
loIP=$(cat /home/yourusername/.obip);
echo "current IP: $curIP, local saved IP: $loIP."
if [ "$curIP" = "$loIP" ]; then
        echo "it's a match."
else
        echo $curIP > /home/yourusername/.obip
        scp /home/yourusername/.obip ubuntu@158.101.156.207:/home/ubuntu/.yourmachinename.obip;
fi
`
