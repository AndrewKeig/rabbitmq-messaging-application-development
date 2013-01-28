#!/bin/sh

echo "Closing orphaned RabbitMQ connections"
peerToDisconnect=1.2.3.4
for c in `rabbitmqctl list_connections peer_address pid | grep $peerToDisconnect`;
do
if [ $c != $peerToDisconnect ];
then rabbitmqctl close_connection $c "Orphaned - disconnecting";
fi;
done
