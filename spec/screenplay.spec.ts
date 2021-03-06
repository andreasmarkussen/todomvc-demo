import { contain, Ensure, equals, property } from '@serenity-js/assertions';
import { actorCalled, actorInTheSpotlight } from '@serenity-js/core';
import { StartLocalServer, StopLocalServer } from '@serenity-js/local-server';
import {
    ClearLocalStorage,
    FilterItems,
    RecordedItems,
    RecordItem,
    RemoveItem,
    RenameItem,
    Start,
    ToggleItem,
} from '../src';

fdescribe('Todo List App', () => {

    beforeEach(() => actorCalled('Jasmine').attemptsTo(
        StartLocalServer.onRandomPort(),
    ));

    describe('actor', () => {

        it('can record new items', () =>
            actorCalled('Jasmine').attemptsTo(
                Start.withAnEmptyList(),
                RecordItem.called('Walk a dog'),
                Ensure.that(RecordedItems(), contain('Walk a dog')),
            ));

        it('can remove the recorded items', () =>
            actorCalled('Jasmine').attemptsTo(
                Start.withAListContaining('Walk a dog'),
                RemoveItem.called('Walk a dog'),
                Ensure.that(RecordedItems(), property('length', equals(0))),
            ));

        it('can mark an item as completed', () =>
            actorCalled('Jasmine').attemptsTo(
                Start.withAListContaining('Buy a cake'),
                ToggleItem.called('Buy a cake'),
            ));

        it('can edit an item', () =>
            actorCalled('Jasmine').attemptsTo(
                Start.withAListContaining('Buy a cake'),
                RenameItem.called('Buy a cake').to('Buy an apple'),
                Ensure.that(RecordedItems(), contain('Buy an apple')),
            ));

        it('can filter the list to show active items only', () =>
            actorCalled('Jasmine').attemptsTo(
                Start.withAListContaining(
                    'Play guitar',
                    'Read a book',
                    'Write some code',
                ),
                ToggleItem.called('Write some code'),
                FilterItems.toShow('Active'),
                Ensure.that(
                    RecordedItems(),
                    equals(['Play guitar', 'Read a book']),
                ),
            ));
    });

    afterEach(() =>
        actorInTheSpotlight().attemptsTo(
            ClearLocalStorage(),
            StopLocalServer.ifRunning(),
        ));
});
