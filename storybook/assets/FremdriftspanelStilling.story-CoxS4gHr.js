import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-BAewwkeG.js";import{w as m,c as D}from"./ContextDecorators-CBnNhaeJ.js";import{K as b}from"./schema.zod-Bp2qdK07.js";import{u as _}from"./useKandidatlisteForEier-B6umFHKN.js";import{F as y,A as N}from"./FullførtStilling-C7jzXGIC.js";import{R as T}from"./GjenåpneStillingKnapp-MVFb7JIE.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-Cu9HDT70.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-Bn92wMOu.js";import"./OrganisasjonsnummerAlert-BH8Lhl2-.js";import"./VStack-CXI2svzi.js";import"./BasePrimitive-4knkzmP5.js";import"./List-BxHSDXvl.js";import"./Link-CPqVa9BH.js";import"./KandidatHendelseTag-CDB_MZMJ.js";import"./Tag-ft2zgNkX.js";import"./ChatExclamationmark-CiEunF_E.js";import"./FileXMark-BMJk6nUx.js";import"./Trash-ZbXVgxpa.js";import"./HandShakeHeart-Uxce-0Ck.js";import"./Calendar-C2wH3ZKH.js";import"./ThumbUp-breDGNtp.js";import"./Table-BN-ar8bS.js";import"./util-DWsJO9vX.js";import"./format-C3LjDUB4.js";import"./match-BwSFFpFi.js";import"./parseISO-Do-jGKA2.js";import"./parse-7oeilopQ.js";import"./getDefaultOptions-BGnhS9gy.js";import"./util-iUGWdSys.js";import"./kandidat.mock-DxMxVP50.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-DVZgey86.js";import"./index-BqpyMEo8.js";import"./index-DODDM8Mj.js";import"./index-mmwqXDhg.js";import"./ChevronDown-BxKDu35T.js";import"./Box-DX0hZx-U.js";import"./Bell-BNtfbiOe.js";import"./PersonChat-BAMMK2H0.js";import"./Eye-CtTREpUz.js";import"./ProgressBar-CcKwO7yt.js";import"./oppdaterStilling-DiYUghRr.js";import"./EyeSlash-CnpkAriX.js";import"./CircleSlash-B6yD6jk9.js";import"./Modal-CIrWHa0R.js";import"./floating-ui.react-D1PTwaoy.js";import"./Date.Input-D0t2X3FR.js";import"./useFormField-BJTd7Cub.js";import"./useControllableState-Cqtxf3VW.js";import"./Modal.context-DrU834AP.js";import"./Checkbox-BJbo7YQp.js";import"./Fieldset-DVHb7iog.js";import"./Pencil-DlknACg4.js";import"./PersonbrukerTekst-B4YezPkZ.js";import"./ClockDashed-nNOkbzzR.js";import"./Tasklist-kzklSNQq.js";import"./ErrorBoundary--hVBXE8J.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Pt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Pt as default};
