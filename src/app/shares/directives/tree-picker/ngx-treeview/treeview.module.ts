import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { DropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { DropdownTreeviewComponent } from './dropdown-treeview.component';
import { TreeviewComponent } from './treeview.component';
import { TreeviewItemComponent } from './treeview-item.component';
import { TreeviewPipe } from './treeview.pipe';
import { TreeviewI18n, TreeviewI18nDefault } from './treeview-i18n';
import { TreeviewConfig } from './treeview-config';
import { TreeviewEventParser, DefaultTreeviewEventParser } from './treeview-event-parser';
import {NbButtonModule, NbContextMenuModule, NbIconModule, NbPopoverModule, NbTooltipModule} from '@nebular/theme';
import { TreeviewCustomComponent } from './treeview-custom/treeview-custom.component'
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        NbButtonModule,
        NbPopoverModule,
        NbTooltipModule,
        NbIconModule,
        NbContextMenuModule,
        DragDropModule
    ],
    declarations: [
        TreeviewComponent,
        TreeviewItemComponent,
        TreeviewPipe,
        DropdownDirective,
        DropdownMenuDirective,
        DropdownToggleDirective,
        DropdownTreeviewComponent,
        TreeviewCustomComponent
    ], exports: [
        TreeviewComponent,
        TreeviewPipe,
        DropdownTreeviewComponent,
        TreeviewCustomComponent
    ]
})
export class TreeviewModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: TreeviewModule,
            providers: [
                TreeviewConfig,
                { provide: TreeviewI18n, useClass: TreeviewI18nDefault },
                { provide: TreeviewEventParser, useClass: DefaultTreeviewEventParser }
            ]
        };
    }
}
