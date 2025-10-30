import{aD as I,M as w,j as t,q as k,S as x,cx as j,cB as b,cD as g,cy as u,P as y,cR as _}from"./iframe-DwwpuTFP.js";import{w as m,c as A}from"./ContextDecorators-BIoayw4p.js";import{F as N,A as v}from"./FullførtStilling-DCfPM9YG.js";import{R as T}from"./GjenåpneStillingKnapp-CPdT7nmT.js";import{T as D}from"./TilgangskontrollForInnhold-BHcT5jB-.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Dga9qocn.js";import"./OrganisasjonsnummerAlert-Dsxpzlk0.js";import"./VStack-BN8fhrlC.js";import"./BasePrimitive-CF6MQeVw.js";import"./List-CX9xI7S7.js";import"./Link-CSctH9gV.js";import"./KandidatHendelseTag-BAi-T6SF.js";import"./Tag-6mjVNMQk.js";import"./ChatExclamationmark-BSK7N_cZ.js";import"./FileXMark-BZ2Ib8x0.js";import"./Trash-IEaWH2zW.js";import"./HandShakeHeart-ejnaLvQS.js";import"./Calendar-CvieklPO.js";import"./ThumbUp-wdeyXNkp.js";import"./Table-DBWICR8j.js";import"./util--TOvclJc.js";import"./parse-CZkEaCBT.js";import"./getDefaultOptions-D6tGVtc1.js";import"./parseISO-Q4MDVn8O.js";import"./index-B4g5cUh7.js";import"./index-B40KJ5b4.js";import"./isBefore-CmUWRxsX.js";import"./util-D_fvgQrs.js";import"./accordion-BToovUQy.js";import"./index-BQUhD3GT.js";import"./index-BSCd2s0D.js";import"./index-BcyPmA4a.js";import"./ChevronDown-COPvl1Il.js";import"./Box-Dy8C-oQK.js";import"./Bell-Drkb17MK.js";import"./PersonChat-DFqNTiUn.js";import"./Eye-bWdVNKW-.js";import"./ProgressBar-BYmTaO0n.js";import"./EyeSlash-Cz1aAnot.js";import"./CircleSlash-DvQCEffq.js";import"./Modal-CKTckRfk.js";import"./floating-ui.react-C4ZL8j1u.js";import"./Date.Input-Cr-2ulbS.js";import"./useFormField-B46YkHgM.js";import"./useControllableState-Xz6eYXrU.js";import"./Modal.context-D7vtMZZl.js";import"./Checkbox-BrDSP9kz.js";import"./Fieldset-B5M_S-CV.js";import"./Pencil-BKdYdqw7.js";import"./PersonbrukerTekst-Vr3p3jE1.js";import"./ClockDashed-BYETmjW3.js";import"./Tasklist-CuezJcd3.js";import"./ErrorBoundary-DFLWiBTz.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ut={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ut as default};
