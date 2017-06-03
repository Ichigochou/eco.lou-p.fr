SHELL:=/bin/bash

NB_COL=$(shell bc -l <<< `tput cols`-10)

NO_COLOR=\033[0m
OK_COLOR=\033[32;01m
ERROR_COLOR=\033[31;01m
WARN_COLOR=\033[33;01m

OK_STRING=$(OK_COLOR)[OK]$(NO_COLOR)
ERROR_STRING=$(ERROR_COLOR)[ERRORS]$(NO_COLOR)
WARN_STRING=$(WARN_COLOR)[WARNINGS]$(NO_COLOR)

AWK_CMD = awk '{ printf "%-$(NB_COL)s %-10s\n",$$1, $$2; }'
PRINT_ERROR = printf "$@ $(ERROR_STRING)\n" | $(AWK_CMD) && printf "$(CMD)\n$$LOG\n" && false
PRINT_WARNING = printf "$@ $(WARN_STRING)\n" | $(AWK_CMD) && printf "$(CMD)\n$$LOG\n"
PRINT_OK = printf "$@ $(OK_STRING)\n" | $(AWK_CMD)
BUILD_CMD = LOG=$$($(CMD) 2>&1) ; if [ $$? -eq 1 ]; then $(PRINT_ERROR); elif [ "$$LOG" != "" ] ; then $(PRINT_WARNING); else $(PRINT_OK); fi;

# BUILD_CMD =
#     LOG=$$($(CMD) 2>&1) ;
#     if [ $$? -eq 1 ]; then
#         $(PRINT_ERROR);
#     elif [ "$$LOG" != "" ] ; then
#         $(PRINT_WARNING);
#     else
#         $(PRINT_OK);
#     fi;

CC=google-closure

SRC= $(shell find . ! -name "*.min.js" -name "*.js")
OBJ= $(SRC:.js=.min.js)
NOEXT= $(SRC:.js=)

all: clean min status add status commit push

diff: clean status diff min

master: clean updateTemplate status add

$(NOEXT):
	$(CC) --js $@.js --js_output_file $@.min.js --language_out ECMASCRIPT5
	@$(BUILD_CMD)

min: $(NOEXT)

clean:
	rm -rf $(OBJ)
	@$(BUILD_CMD)

status:
	git status

diff:
	@read -n 1 -p "Diff all files (no delete, no *.min.js) ? [Y or N]: " answer; \
	echo ""; \
	if [ ! $$answer == "y" ]; then \
	if [ ! $$answer == "Y" ]; then \
	    echo "Done." ; exit 0 ; \
	fi ;\
	fi ;\
    git diff `git status -s | grep -v ^\ D | grep -v \!*.min.js | cut -b4-`

add:
	@read -n 1 -p "Add all files ? [Y or N]: " answer; \
	echo ""; \
	if [ ! $$answer == "y" ]; then \
	if [ ! $$answer == "Y" ]; then \
	    echo "Done." ; exit 0 ; \
	fi ;\
	fi ;\
    git add --all;\
	git status; exit 0;

commit:
	@read -n 1 -p "Commit ? [Y or N]: " answer; \
	echo ""; \
	if [ ! $$answer == "y" ]; then \
	if [ ! $$answer == "Y" ]; then \
	    echo "Done." ; exit 0 ; \
	fi ;\
	fi ;\
	read -p "Enter commit message: " message; \
	echo ""; \
    git commit -m "$$message"

push:
	@read -n 1 -p "Push ? [Y or N]: " answer; \
	echo ""; \
	if [ ! $$answer == "y" ]; then \
	if [ ! $$answer == "Y" ]; then \
	    echo "Done." ; exit 0 ; \
	fi ;\
	fi ;\
    git push

updateTemplate:
	git pull origin master

pull:
	git pull

forcePull:
	git reset --hard HEAD

print-%  : ; @echo $* = $($*)
