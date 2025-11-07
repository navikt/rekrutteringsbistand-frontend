import{aD as I,M as w,j as t,q as k,S as x,cx as j,cF as b,cE as g,cy as u,P as y,cU as _}from"./iframe-D_5AEIMH.js";import{w as m,c as E}from"./ContextDecorators-BZzBM6Ov.js";import{F as N,A as v}from"./FullførtStilling-DDleUFST.js";import{R as T}from"./GjenåpneStillingKnapp-BbRWVbM6.js";import{T as D}from"./TilgangskontrollForInnhold-CG7lZDQd.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DgkAjCPv.js";import"./OrganisasjonsnummerAlert-DzpUV1dk.js";import"./VStack-CEl896nG.js";import"./BasePrimitive-Cj6A43Jo.js";import"./List-Df-2RfUP.js";import"./Link-An6lcgaA.js";import"./KandidatHendelseTag-D3sxRsCE.js";import"./Tag-B_Y7IwSp.js";import"./ChatExclamationmark-x7DRtAM1.js";import"./FileXMark-DCWFYXax.js";import"./Trash-C9wSIMeP.js";import"./HandShakeHeart-DG3Fclzn.js";import"./Calendar-5I-kaAQf.js";import"./ThumbUp-BqARjKJ8.js";import"./Table-B_EbQHny.js";import"./util-CGXHHsWZ.js";import"./parse-0NsPvgA2.js";import"./getDefaultOptions-DyzBGJcO.js";import"./parseISO-BCafnnqu.js";import"./index-ZbxCKysi.js";import"./index-B40KJ5b4.js";import"./isBefore-xToZcEr0.js";import"./util-Cr3UssFU.js";import"./accordion-Y9Vausen.js";import"./index-BG9vm4yq.js";import"./index-SrQLUvPw.js";import"./index-DJKDzB-I.js";import"./ChevronDown-CcdezDTh.js";import"./Box-z2wYIIne.js";import"./Bell-DwDnbgbc.js";import"./PersonChat-DM7Cu24x.js";import"./Eye-CzBqz8pO.js";import"./ProgressBar-C-R0a_Ap.js";import"./EyeSlash-DUt4woPy.js";import"./CircleSlash-D2oZsTwd.js";import"./Modal-DNvQH_Wy.js";import"./floating-ui.react-D6SvponM.js";import"./Date.Input-COm4SJml.js";import"./useFormField-BzwBfefe.js";import"./useControllableState-BSJWGsuF.js";import"./Modal.context-D728kc9W.js";import"./Checkbox-Dhoc4rP_.js";import"./Fieldset-DpwPvpb6.js";import"./Pencil-B0-vCnIa.js";import"./PersonbrukerTekst-DkfVndFZ.js";import"./ClockDashed-BcCO9WIt.js";import"./Tasklist-CiiLadyl.js";import"./ErrorBoundary-DLJmZnWj.js";function n({dropDown:r}){const{stillingsData:i,erEier:A}=I(),d=w(i,A),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=E({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=E({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
