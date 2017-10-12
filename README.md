# Vibrations
A minimalistic soundmap leveraging the SoundCloud and Google Maps APIs.

The sound/location index is cached upon retrieval from SoundCloud, but beyond that there is no local data storage. Sounds themselves are delivered as embedded SoundCloud players.

Map centering and zoom are set dynamically by examining the outer bounds of the current set of locations.
