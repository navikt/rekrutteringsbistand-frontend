import{j as t,e as k}from"./iframe-CHkTVuiI.js";import{w as m,c as D}from"./ContextDecorators-CrAQ9Hc9.js";import{K as I}from"./schema.zod-B4mxKU3O.js";import{u as w}from"./useKandidatlisteForEier-C4YF5wPm.js";import{a as j}from"./StillingsContext-BqLSlB_O.js";import{R as T,F as x,A as b}from"./FullførtStilling-JKsasdxQ.js";import{K as g,I as y}from"./KandidatTyper-CkRsvxsW.js";import{a as _}from"./stilling-typer-DLlwa7NU.js";import{S as N}from"./SWRLaster-177d91rz.js";import{T as A}from"./TilgangskontrollForInnhold-BIeN7h-X.js";import{m as u,a as v}from"./stillingMock-BtxAEQoL.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-SOk_um48.js";import"./OrganisasjonsnummerAlert-DUcHHBz-.js";import"./VStack-M98BC8vl.js";import"./BasePrimitive-DioXofnN.js";import"./List-VkKHJD8N.js";import"./Link-CkfGG5-p.js";import"./KandidatHendelseTag-BiX-vV5K.js";import"./Tag-CCAWPPV3.js";import"./FileXMark-f5rkYKOY.js";import"./Trash-DFUkDF32.js";import"./HandShakeHeart-e31V6fSB.js";import"./Calendar-XriZ9M4u.js";import"./ThumbUp-DwHzK9pn.js";import"./Table-DR-zuF53.js";import"./util-B4fxBsP7.js";import"./format-CiL1qK_N.js";import"./startOfDay-lTP3GKUn.js";import"./match-Cit0idUw.js";import"./parseISO-DJIM71K9.js";import"./parse-CabpiR_f.js";import"./getDefaultOptions-CKIF9KYI.js";import"./util-CPu6-ApK.js";import"./kandidat.mock-F3wnuv6n.js";import"./innsatsgrupper-BqldBv0r.js";import"./chunk-RHFAIXC4-CteuV83n.js";import"./index-DOw5kV98.js";import"./index-BvQF28vZ.js";import"./index-BR16nd7K.js";import"./stilling.dto--v9AHxlS.js";import"./stillingInfoUtil-C2V4vZ-Z.js";import"./oppdaterStilling-DwomIQp_.js";import"./Box-DXeSfoNa.js";import"./EyeSlash-B9GH7sJd.js";import"./CircleSlash-DK05zYub.js";import"./Modal-DJnHWKKy.js";import"./floating-ui.react-B8XfV_lm.js";import"./Date.Input-BR2zdpiX.js";import"./useFormField-D38t1t5q.js";import"./useControllableState-R0yyGfAK.js";import"./ChevronDown-BGLJuQ6d.js";import"./Modal.context-B54ogbif.js";import"./Checkbox-BzwK7FgG.js";import"./Fieldset-DVTpYJLm.js";import"./Pencil-CN6Mv-uF.js";import"./ClockDashed-Cz9k-8Zi.js";import"./PersonChat-DO-t4_kT.js";import"./Tasklist-KpRrcgGo.js";import"./accordion-mZZPHFEn.js";import"./index-CMSbMeMS.js";import"./index-B6P4kTa2.js";import"./index-CPG9i677.js";import"./Bell-BZguajDB.js";import"./Eye-CmU-J_77.js";import"./ProgressBar-D16u-LIa.js";import"./Feilmelding-DgHAx26V.js";import"./CopyButton-CS4PChRX.js";import"./Checkmark-PV8AZsuh.js";import"./Sidelaster-KVwuK41U.js";import"./ErrorBoundary-Dk_OZUrW.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=j(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(N,{hooks:[d],children:e=>{const F=e.status===I.Lukket&&i.stilling.status===_.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+R;return F?t.jsx(x,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(b,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const ti={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=v,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,ti as default};
