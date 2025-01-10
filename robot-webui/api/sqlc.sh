[ "$(ls -A dboutput)" ] && rm dboutput/* || echo ""
sqlc generate