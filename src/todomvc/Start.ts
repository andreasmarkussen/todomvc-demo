import { endsWith, Ensure } from '@serenity-js/assertions';
import { Task } from '@serenity-js/core';
import { LocalServer } from '@serenity-js/local-server';
import { Navigate, Website } from '@serenity-js/protractor';
import { RecordItem } from './RecordItem';

export class Start {
    static withAnEmptyList = () =>
        Task.where(`#actor starts with an empty list`,
            Navigate.to(LocalServer.url()),
            Ensure.that(Website.title(), endsWith('TodoMVC')),
        )

    static withAListContaining = (...items: string[]) =>
        Task.where(`#actor starts with a list containing ${ items.length } items`,
            Start.withAnEmptyList(),
            ...items.map(RecordItem.called),
        )
}
